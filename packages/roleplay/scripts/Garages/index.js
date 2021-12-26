require('./garage')

const garageConfig = [
    {
        entryPos: new mp.Vector3(215.01, -932.58, 24.14),
        exitPos: new mp.Vector3(29.11, -992.47, 217.07),
        garagePos: new mp.Vector3(1252.88, 223.37, -48.63),
        heading: 282.00
    }
]

garageConfig.forEach(garageData => {
    new mp.core.Garage(garageData)
})