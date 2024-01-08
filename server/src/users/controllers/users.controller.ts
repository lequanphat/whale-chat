import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { EditProfileDTO } from '../types';
import { JwtService } from 'src/common/services/jwt.service';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('user')
  async getUser(@Req() req: any, @Res() res: Response) {
    const id: string = req.user.id;
    try {
      const user = await this.usersService.getUserById(id);
      const accessToken = this.jwtService.signAccessToken({ id, role: user.role });
      return res.status(HttpStatus.OK).json({ user, token: accessToken });
    } catch (error) {
      throw error;
    }
  }
  @Get('contacts')
  getAllContacts(@Req() req: any) {
    const id: string = req.user.id;
    try {
      const data = this.usersService.getAllContacts(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  @Get('get-all-users')
  async getAllUsers(@Req() req: any) {
    const id: string = req.user.id;
    try {
      const response = await this.usersService.getAllUsers(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @Post('change-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './public/uploads/avatars/', // avatars directory
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
          // next
          req.fileName = `${uniqueSuffix}-${file.originalname}`;
        },
      }),
    }),
  )
  async changeAvatar(@Req() req: any, @Res() res: Response) {
    try {
      const data = await this.usersService.setAvatar({ file: req.fileName, id: req.user.id });
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
  @Post('edit-profile')
  async editProfile(@Body() data: EditProfileDTO, @Req() req: any, @Res() res: Response) {
    try {
      const value = await this.usersService.editProfile(data, req.user.id);
      return res.status(HttpStatus.OK).json(value);
    } catch (error) {
      throw error;
    }
  }
  @Get(':id')
  getUserByID(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
