declare interface UtilsMp {
    wait(ms: number): Promise<void>
}

declare global {
    interface Mp {
        utils: UtilsMp
    }
}

export {};