import {  Module, NestModule } from "@nestjs/common";
import { UserController } from "src/users/user.controller";
import { UserService } from "src/users/user.service";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./user.entity";
import { AuthGuard } from "src/Middlewares/Authenticate";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports:[
        
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: async (configService: ConfigService) =>({
                secret: configService.get<string>('SECRET_KEy'),
            })
        }),
    ],
    controllers:[UserController],
    providers:[UserService, AuthGuard],
})

export class UserModule{
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(Authenticate)
    //     .forRoutes('/user')
    // }
};
