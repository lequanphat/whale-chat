import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from 'src/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  async sendMail({ email, subject, html }): Promise<any> {
    const mailOptions = {
      from: EMAIL_ADDRESS,
      to: email,
      subject,
      html,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(info);
      return { success: 'Send mail successfully' };
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }
}
