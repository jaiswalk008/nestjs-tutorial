import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import User from "../users/user.entity"
import { ConfigModule, ConfigService } from "@nestjs/config"

export class DBConfig{
    static getDBConfig(configService: ConfigService) : TypeOrmModuleOptions{
        console.log(configService.get('DB_PORT'))
        return {
            type:'mysql',
            host:configService.get('DATABASE_HOST'),
            port:configService.get('PORT'),
            username:configService.get('DATABASE_USER'),
            password:configService.get('DATABASE_PASSWORD'),
            database:configService.get('DATABASE_NAME'),
            entities:[User],
            logging:true,
            synchronize:true,
        }
    }
}

export const dbConnection: TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    useFactory: async (configService : ConfigService):
    Promise<TypeOrmModuleOptions>=> DBConfig.getDBConfig(configService),
    inject:[ConfigService]
}