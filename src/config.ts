export interface ConfigInterface {
    tickrate: number,
    snapshotInterval: number,
    maxConnectedClients: number
}

export const config: ConfigInterface = {
    tickrate: 33,
    snapshotInterval: 20,
    maxConnectedClients: 10
}