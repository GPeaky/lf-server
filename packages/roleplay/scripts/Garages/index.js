require('./garage')

const garageConfig = [
    { // 1
        entryPos: new mp.Vector3(215.01, -932.58, 24.14),
        exitPos: new mp.Vector3(1251.45, 229.54, -48.63),
        garagePos: new mp.Vector3(1252.88, 223.37, -48.63),
        garageOutsidePos: new mp.Vector3(211.73, -939.52, 23.45),
        interiorHeading: 270.00,
        outsideHeading: 233.00,
    },
    { // 2
        entryPos: new mp.Vector3(-745.66 , -1017.82, 8.09),
        exitPos: new mp.Vector3(1251.45, 229.54, -48.63),
        garagePos: new mp.Vector3(1252.88, 223.37, -48.63),
        garageOutsidePos: new mp.Vector3(-745.66 , -1017.82, 8.09),
        interiorHeading: 270.00,
        outsideHeading: 30.00,
    },
]

garageConfig.forEach((garageData, index) => {
    new mp.core.Garage(garageData, 1000 + index)
})