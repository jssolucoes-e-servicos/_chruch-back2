import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from 'src/common/app/controllers/app.controller';
import { AppService } from 'src/common/app/services/app.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CellsNetworkModule } from 'src/modules/cells-network/cells-network.module';
import { ChurchModule } from 'src/modules/church/church.module';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { configLoaderHelper } from '../helpers/config-loader.helper';
import { TimingInterceptor } from '../interceptors/timing.interceptor';
import { LoggerMiddleware } from '../middlewares/LoggerMiddleware';
import { envSchema } from './validators/env-schema';
//joi
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoaderHelper],
      validationSchema: envSchema,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullBoardModule.forRoot({
      route: '/server/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UsersModule,
    AuthModule,
    ChurchModule,
    CellsNetworkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    LoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  static port: string;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('HTTP_PORT');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
