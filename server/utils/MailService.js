import nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '../config/index.js';

// Send email
export const sendMail = ({ email, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: EMAIL_ADDRESS,
        to: email,
        subject,
        text,
    };
    let data = {};
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            data = { error: error.message };
        } else {
            data = { success: 'Send mail successfully' };
        }
    });
    return data;
};
