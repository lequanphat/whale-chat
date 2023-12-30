import { Controller, Get, Param, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('user')
  getUser(@Req() req: any) {
    const id: string = req.user.id;
    return this.usersService.getUserById(id);
  }
  @Get(':id')
  getUserByID(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
