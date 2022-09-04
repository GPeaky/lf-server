import { Model } from "mongoose";

declare interface UtilsMp {
    wait(ms: number): Promise<void>
    setDefaultClothes(player: PlayerMp): void
    PlayerData(player: PlayerMp): PlayerData
    generateNumberPlate(): string
}

declare interface DatabaseMp {
    player: Model<IPlayer>
    vehicle: Model<IVehicle>
}

declare interface LoadPlayer {
    _id: string
    email: string
    password: string
    data: PlayerData
    role: PlayerRole
}

declare interface LastVehicle {
    numberPlate: string
    seat: RageEnums.VehicleSeat
}

declare interface PlayerInternal {
    health: number
    armor: number
    heading: number
    position: Vector3
    role: PlayerRole
    dimension: number
    allWeapons: number[]
    lastVehicle: LastVehicle | false
}

declare interface PlayerSharedStatus {
    hunger: number
    thirst: number
    stamina: number
}

declare interface PlayerShared {
    clothes: any
    hairColor: number[]
    isDead: boolean
    status: PlayerSharedStatus
    identifier: string
    loaded: boolean
    canRespawn: boolean
}

declare interface PlayerData {
    internal: PlayerInternal
    shared: PlayerShared
}

declare global {
    interface Mp {
        utils: UtilsMp
        database: DatabaseMp
    }

    interface PlayerMp {
        internal: PlayerInternal
        shared: PlayerShared
        create(email: string, password: string): Promise<void>
        save(): Promise<void>
        load( player: LoadPlayer ): void
        logout(): Promise<void>
        exist(email: string): Promise<IPlayer | boolean>
        spawnVehicle(vehicle: string, position: Vector3, heading: number): VehicleMp
        repairVehicle(): void
        deleteVehicle(): void
    }
}

export {};