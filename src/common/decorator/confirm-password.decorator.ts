import { registerDecorator, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions } from "class-validator";



export function confirmPassword( property:string , validatorOption?:ValidatorOptions){
  return (object:any ,propertyName:string)=>{
      registerDecorator({
          target:object.constructor,
        propertyName:propertyName,
        constraints:[property],
        options:validatorOption,
        validator:confirmPasswordConstraint
    })
}
}

    @ValidatorConstraint({
        name:"confirmPassword",
        async:false
    })


    export class confirmPasswordConstraint implements ValidatorConstraintInterface{
        validate(value: any, args?: ValidationArguments) {
            const{constraints,object}=args
            const [relatedProperty]=constraints
            const relatedValue=object[relatedProperty]
            return value===relatedValue
        }

        defaultMessage(validationArguments?: ValidationArguments): string {
             return "password and confirm password should be equals "
        }
    }

  