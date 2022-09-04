declare interface SpawnConfig {
    position: [x: number, y: number, z: number]
    heading: number
}

declare interface LogoutConfig {
    dimension: number
}

declare interface IConfig {
    spawn: SpawnConfig
    logout: LogoutConfig
}
