import { ConflictException, ForbiddenException, Injectable ,NotFoundException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password:string;
  }
@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private configService : ConfigService
    ){}
    
    async login(user:UpdateUserDto): Promise<{token:string}>{
        const {email , password} = user;
        const existingUser = await this.usersRepository.findOne({where:{email}});
        if(existingUser){
            const isMatch = await bcrypt.compare(password , existingUser.password );
            if(isMatch){
                return {token : this.jwtService.sign({id:existingUser.id})};
            }
            else{
                throw new ForbiddenException('Invalid credentials');
            }
        }
        else throw new NotFoundException('User not found');
    }

    async createUser(user:CreateUserDto):Promise<User>{
        const existingUser = await this.usersRepository.findOne({where:{email:user.email}});
        if(existingUser){
            throw new ConflictException('User with this email already exists');
        }
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password , saltRounds);
            const res  = await this.usersRepository.save({...user,password:hashedPassword});
            console.log(res);
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    
    async getById(id:number): Promise <User>{
        const res=  await this.usersRepository.findOne({where:{id}});
        return res;
    }

 

}
