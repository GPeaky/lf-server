const Config: IConfig = {
    core: {
        passwordSalts: 10, // Not recommended to change this after release
    },

    spawn: {
        position: [-61.71, -1218.14, 28.7],
        heading: 248.88,
    },

    logout: {
        dimension: 1945,
    },

    utils: {
        numberPlateAlphabet:
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
}

export default Config
