declare interface SpawnConfig {
    position: [x: number, y: number, z: number];
    heading: number;
}

declare interface LogoutConfig {
    dimension: number;
}

declare interface UtilsConfig {
    numberPlateAlphabet: string;
}

declare interface CoreConfig {
    passwordSalts: number;
}

declare interface IConfig {
    core: CoreConfig;
    spawn: SpawnConfig;
    logout: LogoutConfig;
    utils: UtilsConfig;
}
