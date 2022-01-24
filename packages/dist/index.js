const fs = require('fs');

fs.stat('./build', err => {
    if (err) return require('../roleplay')
    require('./build')
})