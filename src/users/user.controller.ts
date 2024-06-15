import {Body,ValidationPipe, Controller , Post, Query, UseGuards, Req,Get} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/Middlewares/Authenticate';


@Controller() // route: /user
export class UserController{
    constructor(private readonly userService:UserService){}
     
    @Post('/login')
    login(@Body(ValidationPipe) user:UpdateUserDto){
        return this.userService.login(user);
    }
    
    @Post('/signup') //POST /user
    createUser(@Body(ValidationPipe) user:CreateUserDto){
        return this.userService.createUser(user);
    }
    @UseGuards(AuthGuard)
    @Get('/user')
    getDetails(@Req() request: any) {
      return this.userService.getById(request.user.id);
    }
}