import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT), 
    secure: false, 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },

});

transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error in email configuration:', error);
    } else {
        console.log('✅ Email server ready to send messages');
    }
});

export default transporter;