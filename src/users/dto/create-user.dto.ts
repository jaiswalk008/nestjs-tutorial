import { IsEmail , IsEnum , IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()

    name: string;

    @IsEmail()
    email: string;
    @IsEnum(['Intern', 'Admin' , 'Engineer'], { message: 'Invalid role' })
    role: 'Intern' | 'Admin' | 'Engineer';
}