import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Role } from './Role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async upgrade(userId: number) {
      const user = await this.findUserById(userId); // Finding the user by the userId
      user.role = Role.Admin; // Changing the role in memory. 
      
      return this.userRepository.save(user); // Saving the updated user obj. into database
    }

    async findUserById(id: number) : Promise<User> {
        return await this.userRepository.findOne({where: {id: id}});
    }

    async findOne(userName: string): Promise<User> {
        const result = await this.userRepository.findOne({where: {userName: userName}});        
        return result;
    }

    async create(username: string, password: string) {
      return this.userRepository.save({username, password}) 
  }

    
        
}
