import { Injectable , CanActivate , ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext):
     boolean | Promise<boolean> | Observable<boolean> {
        console.log('insid the guard')
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        const token = request.headers.authorization;
        console.log(token);
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            request.user = this.jwtService.verify(token);
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException();
            
        }
        return true;
    }
}