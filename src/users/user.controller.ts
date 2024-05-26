import {Body, Controller , Delete, Get, HttpCode, Param, Patch, Post, Query} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') // route: /user
export class UserController{
    constructor(private readonly userService:UserService){}
     
    @Get()
    findAll(@Query('role') role?: 'Intern' | 'Engineer' | 'Admin' , 
        @Query('age') age?: 18){
        return {role ,age};
    }
    @Get('intern') // GET /user/intern
    findAllInterns(){
        return []
    }
    
    @Get(':id') // /user/:id
    findOne(@Param('id') id:string){ // GET /user/1
        // return this.userService.getUser();
        return {id};
    }
    @Post() //POST /user
    createUser(@Body() user:{}){
        return user
    }
    
    @Patch(':id') // PATCH /user/:id/
    updateUser(@Param('id') id:string, @Body() user:{}){
        return {id,...user};
    }
    
    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id') id:string) {
        return {id};
    
    }

}