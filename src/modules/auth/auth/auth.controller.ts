import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, SendOtpDto } from './dto/otp.dto';
import { loginDto, signupDto } from './dto/base.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("/send-otp")
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto)
  }


  @Post("/check-otp")
  checkOtp(@Body() checkOtp: CheckOtpDto) {
    return this.authService.CheckOtp(checkOtp)
  }


  @Post("/signup")
  signup(@Body() signup: signupDto) {
    return this.authService.signup(signup)
  }


  @Post("/login")
  login(@Body() login: loginDto) {
    return this.authService.login(login)
  }


}
