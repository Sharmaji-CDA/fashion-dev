import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      // Register a new user with a hashed password
      async register(userData: Partial<User>): Promise<User> {
        if (!userData.password) {
          throw new Error('Password is required');
        }
    
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.userRepository.create({ ...userData, password: hashedPassword });
    
        return this.userRepository.save(user);
      }
    
      // Find user by email
      async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
      }
    
      // Validate user login with email or phone
      async validateUser(identifier: string, password: string): Promise<User | null> {
        if (!password) {
          throw new Error('Password is required');
        }
    
        const user = await this.userRepository.findOne({
          where: [{ email: identifier }, { phone: identifier }],
        });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        
        return null;
    }
}
