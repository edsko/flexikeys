/**
 * @description Compute velocity curve (part of "flexikeys")
 * @author Edsko de Vries <edsko@edsko.net>
 * @copyright Edsko de Vries, 2024
 * @license MIT
 *
 * NOTE: This is intended for use with the Max for Live `v8` patcher, _not_ the
 * legacy `js` patcher; we make use of ES6 features. Requires Max 9.0 or higher.
 *
 * References
 * - https://docs.cycling74.com/apiref/js/
 * - https://docs.cycling74.com/learn/articles/javascriptchapter01/
 */

/* -----------------------------------------------------------------------------
  Setup device
----------------------------------------------------------------------------- */

// Reload the patcher whenever the file is changed

autowatch = 1;

// Configure inlets and outlets

inlets  = 5;
outlets = 2;

setinletassist(0, "Drive");
setinletassist(1, "Comp");
setinletassist(2, "Out Low");
setinletassist(3, "Out Hi");
setinletassist(4, "Set all four parameters at once (list)")

setoutletassist(0, "Instructions for the itable");
setoutletassist(1, "New parameters (list)")

// Globals

velocityCurveDrive  = 0.0;
velocityCurveComp   = 0.0;
velocityCurveOutLow = 0;
velocityCurveOutHi  = 127;

/* -----------------------------------------------------------------------------
  Handle messsages
----------------------------------------------------------------------------- */

function list() {
    switch(inlet) {
        case 4:
            if(arguments.length == 4) {
                velocityCurveDrive  = arguments[0];
                velocityCurveComp   = arguments[1];
                velocityCurveOutLow = arguments[2];
                velocityCurveOutHi  = arguments[3];
                computeVelocityCurve();
            } else {
                error("Expected list of length 4 on inlet", inlet, "\n");
            }
            break;
        default:
            error("Unexpected list on inlet", inlet, "\n");
            break;
    }
}

function msg_float(n) {
    switch(inlet) {
        case 0:
            velocityCurveDrive = n;
            computeVelocityCurve();
            break;
        case 1:
            velocityCurveComp = n;
            computeVelocityCurve();
            break;
        default:
            error("Unexpected float on inlet", inlet, "\n");
            break;
    }
}

function msg_int(n) {
    switch(inlet) {
        case 2:
            velocityCurveOutLow = n;
            computeVelocityCurve();
            break;
        case 3:
            velocityCurveOutHi = n;
            computeVelocityCurve();
            break;
        default:
            error("Unexpected int on inlet", inlet, "\n");
            break;
    }
}

/* -----------------------------------------------------------------------------
  Compute velocity curve
----------------------------------------------------------------------------- */

{
    // Function-local static variables, for memoization
    let prevDrive  = undefined;
    let prevComp   = undefined;
    let prevOutLow = undefined;
    let prevOutHi  = undefined;

    function computeVelocityCurve() {
        // Local copies of the parameters, for convenience
        let drive  = velocityCurveDrive;
        let comp   = velocityCurveComp;
        let outLow = velocityCurveOutLow;
        let outHi  = velocityCurveOutHi;

        // Avoid unnecessary recomputation
        if( prevDrive  == drive  &&
            prevComp   == comp   &&
            prevOutLow == outLow &&
            prevOutHi  == outHi
        ) {
            // Nothing to do, parameters at the same value
            return;
        } else {
            prevDrive  = drive;
            prevComp   = comp;
            prevOutLow = outLow;
            prevOutHi  = outHi;
        }

        // Initialize `set` instruction for the `itable`.
        let itable = [
            "set",
            0 /* starting table index */,
            0 /* leave velocity 0 ("note off") always at 0 */
        ];

        // Recompute the curve
        // We special case some curves that are faster to compute.
        if(drive == 0) {
            if(comp == 0) {
                if(outLow == 0 && outHi == 127) {
                    // Default parameters, trivial computation
                    for(i = 1; i <= 127; i++) {
                        itable.push(i);
                    }
                } else {
                    // Straight line (`comp` is zero)
                    for(i = 1; i <= 127; i++) {
                        itable.push(fromVelocity(outLow, outHi, i));
                    }
                }
            } else {
                // Curved (`comp` is non-zero)
                for(i = 1; i <= 127; i++) {
                    itable.push(fromVelocity(outLow, outHi, applyCompansion(comp, i)));
                }
            }
        } else {
            // General case
            for(i = 1; i <= 127; i++) {
                itable.push(fromVelocity(outLow, outHi, applyCompansion(comp, applyDrive(drive, i))));
            }
        }

        outlet(0, itable);
    }
}

/* -----------------------------------------------------------------------------
  Auxiliary functions to compute the curve
----------------------------------------------------------------------------- */

with (Math) {
    // Translate velocity in range [0:127] to output range [low:hi]
    function fromVelocity(low, hi, velocity) {
        return low + (velocity / 127) * (hi - low)
    }

    // Translate input range [low:hi] to velocity in range [0:127]
    function toVelocity(low, hi, x) {
        return (x - low) / (hi - low) * 127;
    }

    // Choose μ from `comp` parameter
    // We do this (somewhat arbitrarily) by translating [0:1] to [0:100].
    function chooseMu(comp) {
        return pow(10.0, 2 * comp);
    }

    // Compression (`comp` is positive)
    //
    // `low` and `hi` determine which part of the compression curve we use.
    // For regular compression, this should be [-1:1].
    function compress(low, hi, comp, velocity) {
        let mu  = chooseMu(comp);
        let inp = fromVelocity(low, hi, velocity);

        return toVelocity(low, hi,
              sign(inp)
            * log(1 + mu * abs(inp))
            / log(1 + mu)
        );
    }

    // Expansion (`comp` is negative)
    //
    // `low` and `hi` determine which part of the expansion curve we use.
    // For regular expansion, this should be [-1:1].
    function expand(low, hi, comp, velocity) {
        let mu  = chooseMu(abs(comp));
        let inp = fromVelocity(low, hi, velocity);

        return toVelocity(low, hi,
              sign(inp)
            * (1.0 / mu)
            * (pow(1.0 + mu, abs(inp)) - 1.0)
        );
    }

    // Apply compansion (compression or expansion)
    function applyCompansion(comp, velocity) {
        if(comp >= 0) {
            return compress(-1, 1, comp, velocity);
        } else {
            return expand(-1, 1, comp, velocity);
        }
    }

    // Apply drive
    //
    // This is like `compansion`, but only uses the positive part of the curve.
    function applyDrive(drive, velocity) {
        if(drive >= 0) {
            return compress(0, 1, drive, velocity);
        } else {
            return expand(0, 1, drive, velocity);
        }
    }
}