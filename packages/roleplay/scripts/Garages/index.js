require('./garage')

const garageConfig = [
    { // 1
        entryPos: new mp.Vector3(215.01, -932.58, 24.14),
        entryPlayerPos: new mp.Vector3(211.74, -934.84, 24.28),
        exitPos: new mp.Vector3(1251.45, 229.54, -48.63),
        garagePos: new mp.Vector3(1252.88, 223.37, -48.63),
        garageOutsidePos: new mp.Vector3(211.73, -939.52, 23.45),
        interiorHeading: 270.00,
        outsideHeading: 233.00,
    },
]

garageConfig.forEach((garageData, index) => {
    new mp.core.Garage(garageData, 1000 + index)
})