import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() userData: { name: string; email: string; phone: string; password: string }) {
    return this.userService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData: { identifier: string; password: string }) {
    const user = await this.userService.validateUser(loginData.identifier, loginData.password);
    if (!user) {
      throw new BadRequestException('Invalid email, mobile number, or password');
    }
    return { message: 'Login successful', user };
  }
}
