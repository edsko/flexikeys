/**
 * @description Compute velocity curve (part of "flexikeys")
 * @author Edsko de Vries <edsko@edsko.net>
 * @copyright Edsko de Vries, 2024
 * @license MIT
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

inlets  = 6;
outlets = 3;

setinletassist(0, "Drive");
setinletassist(1, "Comp");
setinletassist(2, "Out Low");
setinletassist(3, "Out Hi");
setinletassist(4, "Set all four parameters at once (list)")
setinletassist(5, "Input velocity");

setoutletassist(0, "Instructions for the itable");
setoutletassist(1, "New parameters (list)")
setoutletassist(2, "Computed output velocity")

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

        // Always leave velocity 0 ("note off") at 0.
        outlet(0, [0, 0]);

        // Recompute the curve
        // We special case some curves that are faster to compute.
        if(drive == 0 && comp == 0 && outLow == 0 && outHi == 127) {
            // Default parameters
            for(i = 1; i <= 127; i++) {
                outlet(0, [i, i]);
            }
        } else if(prevDrive == 0 && prevComp == 0) {
            // Only outLow and outHi have non-default parameters.
            // This is a much faster computation than the general case.
            for(i = 1; i <= 127; i++) {
                outlet(0, [i, outLow + (i / 127) * (outHi - outLow)]);
            }
        } else {
            // General case
        }
    }
}
