import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { OtpEntity } from './entities/otp.entity';
import { AuthModule } from 'src/modules/auth/auth/auth.module';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
