import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { Middleware } from './Middlewares/middleware';
import config from './config/config';
import { dbConnection } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath:'.env',
    isGlobal: true,
    cache:true,
    load:[config]
  }) , UserModule , TypeOrmModule.forRootAsync(dbConnection) ],
  controllers: [AppController],
  providers: [AppService],
})


//forRoutes can take string(s) or any controller
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware)
    .exclude({path:'/' , method:RequestMethod.POST})
    .forRoutes({ path: '/', method: RequestMethod.GET })
     
  }
  
}
