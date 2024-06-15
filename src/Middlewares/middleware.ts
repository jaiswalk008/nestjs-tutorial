import { Injectable , NestMiddleware } from "@nestjs/common";
import { Request , Response , NextFunction } from "express";

@Injectable()
export class Middleware implements  NestMiddleware{
    use(req:Request , res:Response , next:NextFunction){
        console.log('This is middleware 3');
        next();
    }
}