module.exports = {
    displayName: {
        name: 'lf-server',
        color: 'cyan'
    },

    rootDir: './development',
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    }
}