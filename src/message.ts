import { Snapshot } from "./snapshot";

export enum MessageType {
    IDENTIFIER = "identifier",
    SNAPSHOT = "snapshot",
    DISCONNECT = "disconnect"
}

export interface IdentifierMessage {
    type: MessageType.IDENTIFIER,
    data: number
}

export interface SnapshotMessage {
    type: MessageType.SNAPSHOT
    data: Snapshot
}

export interface DisconnectMessage {
    type: MessageType.DISCONNECT
    data: number
}