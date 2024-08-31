import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";



@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory{
    constructor(private configService:ConfigService){}
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            port:this.configService.get("Db.port"),
            host:this.configService.get("Db.host"),
            username:this.configService.get("Db.username"),
            password:this.configService.get("Db.password"),
            entities:['dist/**/**/**/*.entity.{.ts,js}'],
            type:"postgres",
            database:"auth-otp",
            synchronize:true

        }
    }
}