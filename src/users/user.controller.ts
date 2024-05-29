import {Body, Controller , Delete, Get, HttpCode, Param, Patch, Post, Query} from '@nestjs/common';
import { UserService,UserInterface } from './user.service';

@Controller('user') // route: /user
export class UserController{
    constructor(private readonly userService:UserService){}
     
    @Get()
    findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin'){
        console.log(role);
        return this.userService.getUsers(role);
    }
    // @Get('intern') // GET /user/intern
    // findAllInterns(){
    //     return []
    // }
    
    @Get(':id') // /user/:id
    findOne(@Param('id') id:number){ // GET /user/1
        // return this.userService.getUser();
        return this.userService.findOne(+id);
    }
    @Post() //POST /user
    createUser(@Body() user:UserInterface){
        return this.userService.createUser(user);
    }
    
    @Patch(':id') // PATCH /user/:id/
    updateUser(@Param('id') id:number, @Body() user:UserInterface){
        return this.userService.updateUser(+id,user);
    }
    
    @Delete(':id')
    @HttpCode(201)
    deleteUser(@Param('id') id:number) {
        return this.userService.deleteUser(+id);
    }

}