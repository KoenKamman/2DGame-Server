import * as WebSocket from 'ws';
import { Game } from './game';
import { Player } from './player';

const wss = new WebSocket.Server({
    port: 8080
});
const game = new Game();

let clientCount = 0;

game.snapshot.subscribe((snapshot) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(snapshot));
        }
    });
});

wss.on('connection', (ws) => {
    clientCount++;
    let clientId = clientCount;
    game.players.push(new Player(clientId));

    ws.on('close', () => {
        game.players = game.players.filter(player => player.id !== clientId);
    });
});