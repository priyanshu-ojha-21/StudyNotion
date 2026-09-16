const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // smtp-relay.brevo.com
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER, // Brevo Login Email
                pass: process.env.MAIL_PASS, // Brevo SMTP Key (xsmtpsib-...)
            },
            // Render cloud par connection latakne se rokne ke liye:
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
        });

        let info = await transporter.sendMail({
            // ⚠️ FIX: Display Name ke sath valid Sender Email add karna zaroori hai
            from: `StudyNotion <ojhap259@gmail.com>`, 
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });

        console.log("Email info:", info);
        return info;
    }
    catch(error) {
        console.log("Mail send failed:", error.message);
        return null;
    }
}

module.exports = mailSender;