var pathA = document.getElementById('pathA'),
  pathC = document.getElementById('pathC'),
  segmentA = new Segment(pathA, 8, 32),
  segmentC = new Segment(pathC, 8, 32),
  wrapper = document.getElementById('menu-icon-wrapper'),
  wrapper2 = document.getElementById('menu-icon-wrapper2'),
  wrapper3 = document.getElementById('menu-icon-wrapper3'),
  wrapper4 = document.getElementById('menu-icon-wrapper4');
  wrapper.style.visibility = 'visible';
  wrapper2.style.visibility = 'visible';
  wrapper3.style.visibility = 'visible';
  wrapper4.style.visibility = 'visible';

function inAC(s) {
  s.draw('80% - 24', '80%', 0.3, {
    delay: 0.1,
    callback: function () {
      inAC2(s)
    }
  });
}

function inAC2(s) {
  s.draw('100% - 54.5', '100% - 30.5', 0.6, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}



// Initialize
var pathB = document.getElementById('pathB'),
  segmentB = new Segment(pathB, 8, 32);

// Expand the bar a bit
function inB(s) {
  s.draw(8 - 6, 32 + 6, 0.1, {
    callback: function () {
      inB2(s)
    }
  });
}

// Reduce with a bounce effect
function inB2(s) {
  s.draw(8 + 12, 32 - 12, 0.3, {
    easing: ease.ease('bounce-out', 1, 0.3)
  });
}

// Run the animation


function outAC(s) {
  s.draw('90% - 24', '90%', 0.1, {
    easing: ease.ease('elastic-in', 1, 0.3),
    callback: function () {
      outAC2(s)
    }
  });
}

function outAC2(s) {
  s.draw('20% - 24', '20%', 0.3, {
    callback: function () {
      outAC3(s)
    }
  });
}

function outAC3(s) {
  s.draw(8, 32, 0.7, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}

function outB(s) {
  s.draw(8, 32, 0.7, {
    delay: 0.1,
    easing: ease.ease('elastic-out', 2, 0.4)
  });
}

// Run the animations


var trigger = document.getElementById('menu-icon-trigger'),
  toCloseIcon = true;

trigger.onclick = function () {
  if (toCloseIcon) {
    inAC(segmentA);
    inB(segmentB);
    inAC(segmentC);
  } else {
    outAC(segmentA);
    outB(segmentB);
    outAC(segmentC);
  }
  toCloseIcon = !toCloseIcon;
};







var pathAz = document.getElementById('pathAz'),
  pathCz = document.getElementById('pathCz'),
  segmentAz = new Segment(pathAz, 8, 32),
  segmentCz = new Segment(pathCz, 8, 32);

function inACz(s) {
  s.draw('100%', '85%', 0.3, {
    delay: 0.1,
    callback: function () {
      inAC2z(s)
    }
  });
}

function inAC2z(s) {
  s.draw('100%-4', '83%', 0.6, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}



// Initialize
var pathBz = document.getElementById('pathBz'),
  segmentBz = new Segment(pathBz, 8, 32);

// Ezpand the bar a bit
function inBz(s) {
  s.draw(8 - 6, 32 + 6, 0.1, {
    callback: function () {
      inB2z(s)
    }
  });
}

// Reduce with a bounce effect
function inB2z(s) {
  s.draw(8 + 12, 32 - 12, 0.3, {
    easing: ease.ease('bounce-out', 1, 0.3)
  });
}

// Run the animation


function outACz(s) {
  s.draw('90% - 24', '90%', 0.1, {
    easing: ease.ease('elastic-in', 1, 0.3),
    callback: function () {
      outAC2z(s)
    }
  });
}

function outAC2z(s) {
  s.draw('20% - 24', '20%', 0.3, {
    callback: function () {
      outAC3z(s)
    }
  });
}

function outAC3z(s) {
  s.draw(8, 32, 0.7, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}

function outBz(s) {
  s.draw(8, 32, 0.7, {
    delay: 0.1,
    easing: ease.ease('elastic-out', 2, 0.4)
  });
}

// Run the animations


var trigger2 = document.getElementById('menu-icon-trigger2'),
  toCloseIcon2 = true;

trigger2.onclick = function () {
  if (toCloseIcon2) {
    inACz(segmentAz);
    inBz(segmentBz);
    inACz(segmentCz);
  } else {
    outACz(segmentAz);
    outBz(segmentBz);
    outACz(segmentCz);
  }
  toCloseIcon2 = !toCloseIcon2;
};









var pathAx = document.getElementById('pathAx'),
  pathCx = document.getElementById('pathCx'),
  segmentAx = new Segment(pathAx, 8, 32),
  segmentCx = new Segment(pathCx, 8, 32);

function inACx(s) {
  s.draw('100%', '80%', 0.3, {
    delay: 0.1,
    callback: function () {
      inAC2x(s)
    }
  });
}

function inAC2x(s) {
  s.draw('100%-3', '78%', 0.6, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}



// Initialixe
var pathBx = document.getElementById('pathBx'),
  segmentBx = new Segment(pathBx, 8, 32);

// Expand the bar a bit
function inBx(s) {
  s.draw(8 - 6, 32 + 6, 0.1, {
    callback: function () {
      inB2x(s)
    }
  });
}

// Reduce with a bounce effect
function inB2x(s) {
  s.draw(8 + 12, 32 - 12, 0.3, {
    easing: ease.ease('bounce-out', 1, 0.3)
  });
}

// Run the animation


function outACx(s) {
  s.draw('90% - 24', '90%', 0.1, {
    easing: ease.ease('elastic-in', 1, 0.3),
    callback: function () {
      outAC2x(s)
    }
  });
}

function outAC2x(s) {
  s.draw('20% - 24', '20%', 0.3, {
    callback: function () {
      outAC3x(s)
    }
  });
}

function outAC3x(s) {
  s.draw(8, 32, 0.7, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}

function outBx(s) {
  s.draw(8, 32, 0.7, {
    delay: 0.1,
    easing: ease.ease('elastic-out', 2, 0.4)
  });
}

// Run the animations


var trigger3 = document.getElementById('menu-icon-trigger3'),
  toCloseIcon3 = true;

trigger3.onclick = function () {
  if (toCloseIcon3) {
    inACx(segmentAx);
    inBx(segmentBx);
    inACx(segmentCx);
  } else {
    outACx(segmentAx);
    outBx(segmentBx);
    outACx(segmentCx);
  }
  toCloseIcon3 = !toCloseIcon3;
};









var pathAc = document.getElementById('pathAc'),
  pathCc = document.getElementById('pathCc'),
  segmentAc = new Segment(pathAc, 8, 32),
  segmentCc = new Segment(pathCc, 8, 32);

function inACc(s) {
  s.draw('100%', '84%', 0.3, {
    delay: 0.1,
    callback: function () {
      inAC2c(s)
    }
  });
}

//function inAC2c(s) {
//  s.draw('84%', '95%', 0.6, {
//   easing: ease.ease('elastic-out', //1, 0.3)
//  });
//}



// Initialice
var pathBc = document.getElementById('pathBc'),
  segmentBc = new Segment(pathBc, 8, 32);

// Ecpand the bar a bit
function inBc(s) {
  s.draw(8, 32, 0.1, {
    callback: function () {
      inB2c(s)
    }
  });
}

// Reduce with a bounce effect
function inB2c(s) {
  s.draw(8, 32, 0.3, {
    easing: ease.ease('bounce-out', 1, 0.3)
  });
}

// Run the animation


function outACc(s) {
  s.draw('90% - 24', '90%', 0.1, {
    easing: ease.ease('elastic-in', 1, 0.3),
    callback: function () {
      outAC2c(s)
    }
  });
}

function outAC2c(s) {
  s.draw('20% - 24', '20%', 0.3, {
    callback: function () {
      outAC3c(s)
    }
  });
}

function outAC3c(s) {
  s.draw(8, 32, 0.7, {
    easing: ease.ease('elastic-out', 1, 0.3)
  });
}

function outBc(s) {
  s.draw(8, 32, 0.7, {
    delay: 0.1,
    easing: ease.ease('elastic-out', 2, 0.4)
  });
}

// Run the animations


var trigger4 = document.getElementById('menu-icon-trigger4'),
  toCloseIcon4 = true;

trigger4.onclick = function () {
  if (toCloseIcon4) {
    inACc(segmentAc);
    inBc(segmentBc);
    inACc(segmentCc);
  } else {
    outACc(segmentAc);
    outBc(segmentBc);
    outACc(segmentCc);
  }
  toCloseIcon4 = !toCloseIcon4;
};