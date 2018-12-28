import { Snapshot } from "./snapshot";
import { ServerInfo } from "./server-info";
import { Player } from "./entities/player";

export enum MessageType {
    SERVER_INFO = "server_info",
    SNAPSHOT = "snapshot",
    DISCONNECT = "disconnect",
    CONNECT = "connect"
}

export interface ServerInfoMessage {
    type: MessageType.SERVER_INFO,
    data: ServerInfo
}

export interface SnapshotMessage {
    type: MessageType.SNAPSHOT
    data: Snapshot
}

export interface ConnectMessage {
    type: MessageType.CONNECT
    data: Player
}

export interface DisconnectMessage {
    type: MessageType.DISCONNECT
    data: Player
}