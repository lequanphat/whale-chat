import { Controller, Get } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactServic: ContactService) {}
  @Get('admin')
  @Roles(['user', 'admin'])
  async adminRouter() {
    return 'admin router ok';
  }
  @Get('user')
  @Roles(['user'])
  async userRouter() {
    return 'user router ok';
  }
}
