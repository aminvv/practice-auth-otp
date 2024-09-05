import { IsEmail, IsMobilePhone, IsString } from "class-validator"
import { confirmPassword } from "src/common/decorator/confirm-password.decorator"



export class signupDto {
@IsString()    
first_name:string

@IsString()    
last_name:string 

@IsMobilePhone()    
mobile:string

@IsString()    
@IsEmail()
email:string

@IsString()    
password:string

@IsString()
@confirmPassword("password")    
confirm_password:string
}




export class loginDto {
    @IsString()
    @IsEmail()
    email:string

    @IsString()
     password:string
}