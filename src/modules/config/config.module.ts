import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "src/config/config";
import { TypeOrmDbConfig } from "src/config/typeOrm.config";

@Module({
    imports:[
        ConfigModule.forRoot({load:configuration,isGlobal:true})
    ],
    controllers:[],
    providers:[]

})
export class CustomConfigModule{}