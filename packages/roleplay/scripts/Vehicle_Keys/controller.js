// const Keys = require('../../database/models/Vehicle_Keys');

// let Cache = {}

// const Add = (plate, owner) => {
//     Cache[plate].push(owner)
//     Keys.update({
//         owners: JSON.stringify(Cache[plate])
//     }, {
//         where: {
//             plate: plate
//         }
//     })
// }

// const Remove = (plate, owner) => {
//     Cache[plate].splice(Cache[plate].indexOf(owner), 1)
//     if (Cache[plate].length != 0) {
//         Keys.update({
//             owners: JSON.stringify(Cache[plate])
//         }, {
//             where: {
//                 plate: plate
//             }
//         })
//     }else{
//         Delete(plate)
//     }
// }

// const Create = (plate, owner) => {
//     console.log(plate, owner)
//     Keys.create({
//         plate: plate,
//         owners: JSON.stringify([owner])
//     })
//     Cache[plate] = [owner]
// }

// const Delete = (plate) => {
//     Keys.destroy({
//         where: {
//             plate: plate
//         }
//     })
//     Cache[plate] = undefined
// }

// const Load = () => {
//     Keys.findAll().then(keys => {
//         keys.forEach(key => {
//             Cache[key.plate] = JSON.parse(key.owners)
//         })
//     })
// }

// Load()

// module.exports = { Add, Remove, Create, Delete, Load }