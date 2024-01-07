import { Module } from '@nestjs/common';
import { ContactService } from './services/contact.service';
import { ContactController } from './controllers/contact.controller';

@Module({ controllers: [ContactController], providers: [ContactService] })
export class ContactModule {}
