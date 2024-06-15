import { Request , Response , NextFunction } from "express"
export default (req:Request , res:Response , next:NextFunction) =>{
    console.log('In middleware 2')
    next();
}