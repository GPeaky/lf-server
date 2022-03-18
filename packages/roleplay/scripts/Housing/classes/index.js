require('./House')
// const HousesDB = mp.database.Houses

// const Init = async () => {
//     console.log('Init Housing')
//     const Houses = await HousesDB.findAll()
//     Houses.forEach(house => {
//         console.log('House_ ' + house)
//     })
//     // Houses.forEach(house => new mp.housing.House(house))
// }

// Init()

new mp.housing.House({
    id: 1,
    outsideDoorCoords: new mp.Vector3(89.7, -1099.94, 29.28),
    insideDoorCoords: new mp.Vector3(151.4, -1007.28, -99.0),
    owner: 'marcos',
})