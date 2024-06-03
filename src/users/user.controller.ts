import {Body, ParseIntPipe,ValidationPipe, Controller , Delete, Get, HttpCode, Param, Patch, Post, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user') // route: /user
export class UserController{
    constructor(private readonly userService:UserService){}
     
    @Get()
    findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin'){
        console.log(role);
        return this.userService.getUsers(role);
    }
    
    @Get(':id') // /user/:id
    findOne(@Param('id', ParseIntPipe) id:number){ // GET /user/1
        // return this.userService.getUser();
        return this.userService.findOne(id);
    }
    @Post() //POST /user
    createUser(@Body(ValidationPipe) user:CreateUserDto){
        return this.userService.createUser(user);
    }
    
    @Patch(':id') // PATCH /user/:id/
    updateUser(@Param('id' , ParseIntPipe) id:number, @Body() user:UpdateUserDto){
        return this.userService.updateUser(id,user);
    }
    
    @Delete(':id')
    @HttpCode(201)
    deleteUser(@Param('id') id:number) {
        return this.userService.deleteUser(+id);
    }

}