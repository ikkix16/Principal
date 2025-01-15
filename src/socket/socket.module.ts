import { Module } from '@nestjs/common';
import { SocketService } from './socket/socket.service';
import { SocketGateway } from './socket/socket.gateway';


@Module({
    providers: [SocketGateway, SocketService],
})
export class SocketModule { }
