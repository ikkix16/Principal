import { Module } from '@nestjs/common';

import { SocketService } from './socket/socket/socket.service';
import { SocketModule } from './socket/socket.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [SocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [],
  providers: [SocketService],
})
export class AppModule { }
