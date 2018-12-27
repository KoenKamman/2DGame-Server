import { Snapshot } from "./snapshot";
import { ServerInfo } from "./server-info";

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
    data: number
}

export interface DisconnectMessage {
    type: MessageType.DISCONNECT
    data: number
}