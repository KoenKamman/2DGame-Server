export interface ConfigInterface {
    tickrate: number,
    snapshotRate: number,
    maxConnectedClients: number,
    port: number
}

export const config: ConfigInterface = {
    tickrate: 33,
    snapshotRate: 20,
    maxConnectedClients: 10,
    port: 8080
}