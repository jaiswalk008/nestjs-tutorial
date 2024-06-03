import { Injectable ,NotFoundException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
  }
@Injectable()
export class UserService{
    private users: UserInterface[] = [
        { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Engineer' },
        { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Intern' },
        { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'Admin' },
        { id: 4, name: 'David Wilson', email: 'david.wilson@example.com', role: 'Engineer' },
        { id: 5, name: 'Eva Green', email: 'eva.green@example.com', role: 'Intern' },
        { id: 6, name: 'Frank White', email: 'frank.white@example.com', role: 'Admin' },
        { id: 7, name: 'Grace Black', email: 'grace.black@example.com', role: 'Engineer' },
        { id: 8, name: 'Henry Yellow', email: 'henry.yellow@example.com', role: 'Intern' },
        { id: 9, name: 'Ivy Blue', email: 'ivy.blue@example.com', role: 'Admin' },
        { id: 10, name: 'Jack Red', email: 'jack.red@example.com', role: 'Engineer' },
      ];
    getUsers(role?: 'Intern'| 'Admin' | 'Engineer'){
        
        if(role){
            const res =  this.users.filter(user => user.role === role);
            if(res.length===0) throw new NotFoundException('Role Not Found');
            return res;
        }
        return this.users;
    }
    findOne(id:number){
        const res =  this.users.filter(user => user.id === id)[0];
        if(!res) throw new NotFoundException('User Not Found');
        return res;
    }
    createUser(user:CreateUserDto){
        const id = this.users.length+1;
        this.users.push({id, ...user});
        return {id,...user};
    }
    updateUser(id :number, userData:UpdateUserDto){
        let updatedUser={};
        this.users = this.users.map((user:UserInterface) =>{
            if(user.id === id){
                updatedUser = {...user, ...userData};
                return {...user, ...userData};
            }
            return user;
        })
        return updatedUser
    }
    deleteUser(id:number){
        this.users = this.users.filter(user => user.id !== id);
        return {message: 'User deleted successfully.'}
    }

}
