import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './config/typeOrm.config';
import { UserModule } from './modules/user/user/user.module';
import { AuthModule } from './modules/auth/auth/auth.module';


@Module({
  imports: [
    CustomConfigModule
   ,TypeOrmModule.forRootAsync({useClass:TypeOrmDbConfig,inject:[TypeOrmDbConfig]})
   ,UserModule
   ,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,TypeOrmDbConfig],
})
export class AppModule {}
 