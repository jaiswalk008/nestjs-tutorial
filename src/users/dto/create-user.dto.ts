import { IsEmail , IsEnum , IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()

    name: string;

    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    password:string
}