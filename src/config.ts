export interface ConfigInterface {
    tickrate: number,
    snapshotInterval: number,
    maxConnectedClients: number,
    port: number
}

export const config: ConfigInterface = {
    tickrate: 33,
    snapshotInterval: 20,
    maxConnectedClients: 10,
    port: 8080
}