import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserRegiserDTO } from '../../auth/types/register-user.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  register(@Body() data: UserRegiserDTO) {
    const userRegister = plainToClass(UserRegiserDTO, data, {
      excludeExtraneousValues: true,
    });
    return this.usersService.register(userRegister);
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}