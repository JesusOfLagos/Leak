import nodemailer from 'nodemailer'
import config from './config'


export const sendMail = (subject: string, text: string, to: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.globalFrom,
                pass: config.mail.smtpClientSecret
            },
        })

        const mailOptions = {
            from: '',
            to,
            subject,
            text,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                return false
            } else {
                console.log('Email sent: ' + info.response)
                return true
            }
        })
    } catch (error) {
        return false
    }
}