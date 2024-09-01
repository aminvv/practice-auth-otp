import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/user/user/entities/otp.entity';
import { UserEntity } from 'src/modules/user/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CheckOtpDto, SendOtpDto } from './dto/auth.dto';
import { randomInt } from 'crypto';import { TokenPayload } from './types/payload';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
``

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
        private configService:ConfigService,
        private jwtService:JwtService) { }

    async sendOtp(sendOtpDto: SendOtpDto) {
        const { mobile } = sendOtpDto
        let user = await this.userRepository.findOneBy({ mobile })
        if (!user) {
            user = await this.userRepository.create({ mobile })
            user = await this.userRepository.save(user)
        }else
        await this.createOtpForUser(user)
            return {
                message: "otp code successfully"
            }
        


    }

    async CheckOtp(CheckOtpDto:CheckOtpDto){
        
        const {code, mobile}= CheckOtpDto
       const user= await this.userRepository.findOne({
       where: {mobile},
        relations:{otp:true}
    })
       if(!user){
    throw new UnauthorizedException("user not found ")
    }
    if(user.otp.code!==code ){
        throw new UnauthorizedException("otp code it's not match")
    }

    if(user.otp.expires_in < new Date()){
        throw new UnauthorizedException( "otp code is expire")
    }

    if(!user.mobile_verify){
        await this.userRepository.update({id:user.id},{mobile_verify:true})
        
    }

    const {accessToken,refreshToken}= this.makeTokenForUser({id:user.id,mobile})
    return {
        accessToken,
        refreshToken,
        message: "you logged  in successfully"}

    }

    async createOtpForUser(user: UserEntity) {
        const code = randomInt(10000, 99999).toString()
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2)
        const now =new Date()
        let otp = await this.otpRepository.findOneBy({ userId: user.id })
        if (otp) {
            if(otp.expires_in>now){
                throw new BadRequestException("otp code not  expired")
            }
            otp.code = code
            otp.expires_in = expiresIn

        } else {
            otp = await this.otpRepository.create({
                code,
                expires_in: expiresIn,
                userId: user.id
            })
        }
        otp = await this.otpRepository.save(otp)
        user.otpId = otp.id
        user = await this.userRepository.save(user)


    }

    makeTokenForUser(payload:TokenPayload){
        const accessToken=  this.jwtService.sign(payload,{
            secret:this.configService.get("Jwt.accessToken"),
            expiresIn:"30d"
        })

        const refreshToken= this.jwtService.sign(payload,{
            secret: this.configService.get("Jwt.refreshToken"),
            expiresIn:"1y"

        })

        return {
            accessToken,
            refreshToken
        }
    }

    async validationAccessToken(token:string){
        try {
            const payload=this.jwtService.verify<TokenPayload>(token,{
                secret:this.configService.get("Jwt.accessToken")
            })

            if(typeof payload ==="object" && payload.id){
                const user=await this.userRepository.findOneBy({id:payload.id})
                if(!user){
                    throw new UnauthorizedException(" login on your account ")
                }else{
                    return user
                }
            }
            throw new UnauthorizedException(" login on your account ")



        } catch (error) {
            throw new UnauthorizedException(" login on your account ")
            
        }
    }


    


}