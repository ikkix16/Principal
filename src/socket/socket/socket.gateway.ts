import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({ maxHttpBufferSize: 1e8 })
export class SocketGateway implements OnGatewayConnection {
    @WebSocketServer()
    private server: Socket;
    constructor(private readonly socketService: SocketService) { }

    handleConnection(socket: Socket): void {
        console.log('A Ping Happened');
        this.socketService.handleConnection(socket);

        socket.on('disconnect', () => {
            console.log('A Ping Dishappened');
        });
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket,): string {
        console.log("New Message: " + message)
        this.server.emit('message', message);
        return message;
    }

    @SubscribeMessage('img')
    handleImg(@MessageBody() img: Blob, @ConnectedSocket() client: Socket) {
        console.log("New img received")
        this.server.emit('img', img);
        return img;
    }

    @SubscribeMessage('video')
    handleVideo(@MessageBody() video: Blob, @ConnectedSocket() client: Socket) {
        console.log("New Video received")
        this.server.emit('video', video);
        return video;
    }

}