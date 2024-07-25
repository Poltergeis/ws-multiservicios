import nodemailer from "nodemailer";

export default class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.OUR_GMAIL_SENDER_GMAIL,
                pass: process.env.OUR_GMAIL_SENDER_PSW
            }
        });
    }

    public getTransporter() {
        return this.transporter;
    }
}



export type MailOptions = {
    from: string,
    to: string,
    subject: string,
    text: string
} | {
    from: string,
    to: string,
    subject: string,
    html: string
}