import { Player } from "./entities/player";

export interface ServerInfo {
    players: Array<Player>,
    player: Player,
    snapshotRate: number
}