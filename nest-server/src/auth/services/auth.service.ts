import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register() {
    return 'auth register';
  }
}
