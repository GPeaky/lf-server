const rpmCircle = new Gauge(
	document.getElementsByClassName("rpm")[0]
).setOptions({
    angle: -0.00, // The span of the gauge arc
    lineWidth: 0.07, // The line thickness
    radiusScale: 0.55, // Relative radius
    pointer: {
      length: 0, // // Relative to gauge radius
      strokeWidth: 0, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStop: 'green',    // just experiment with them
    strokeColor: '#00FF00',  // to see which ones work best for you
    strokeColor: '#010101b8',  // to see which ones work best for you
    generateGradient: false,
    highDpiSupport: true,     // High resolution support
});

const kmhCircle = new Gauge(
    document.getElementsByClassName("kmh")[0]
).setOptions({
    angle: -0.00, // The span of the gauge arc
    lineWidth: 0.080, // The line thickness
    radiusScale: 0.75, // Relative radius
    pointer: {
      length: 0, // // Relative to gauge radius
      strokeWidth: 0, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStop: 'rgb(218, 24, 176)',    // just experiment with them
    strokeColor: '#9841FA',  // to see which ones work best for you
    strokeColor: '#010101b8',  // to see which ones work best for you
    generateGradient: false,
    highDpiSupport: true,     // High resolution support
});

kmhCircle.maxValue = 250
kmhCircle.minValue = 1;
kmhCircle.anumationSpeed = 1000;
kmhCircle.set(120)

rpmCircle.maxValue = 10000; // set max gauge value
rpmCircle.minValue = 2000;
rpmCircle.anumationSpeed = 1000;
rpmCircle.set(10000)

const setSpeedometer = (speed, rpm, fuel) => {
    rpmCircle.set(rpm)
    kmhCircle.set(speed)
}