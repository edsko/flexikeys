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

inlets  = 4;
outlets = 1;

setinletassist(0, "Drive");
setinletassist(1, "Comp");
setinletassist(2, "Out Hi");
setinletassist(3, "Out Low");

setoutletassist(0, "New values (list)");

// Globals

velocityCurveDrive  = 0.0;
velocityCurveComp   = 0.0;
velocityCurveOutHi  = 127;
velocityCurveOutLow = 0;

/* -----------------------------------------------------------------------------
  Handle messsages
----------------------------------------------------------------------------- */

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
            velocityCurveOutHi = n;
            computeVelocityCurve();
            break;
        case 3:
            velocityCurveOutLow = n;
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

function computeVelocityCurve() {
    for(i = 0; i < 256; i++) {
        outlet(0, [i, i]);
    }
}
