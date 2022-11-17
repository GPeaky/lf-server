declare enum PlayerRole {
    'user' = 'user',
    'superUser' = 'superUser',
}

declare interface PlayerData {
    test: string
}

declare interface IPlayer {
    _id: string
    email: string
    password: string
    data: PlayerData
    role: PlayerRole
}
