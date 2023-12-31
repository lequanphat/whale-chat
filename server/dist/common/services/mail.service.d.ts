export declare class EmailService {
    private transporter;
    constructor();
    sendMail({ email, subject, html }: {
        email: any;
        subject: any;
        html: any;
    }): Promise<any>;
}
