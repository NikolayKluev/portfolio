const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Настройка транспорта Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Проверка подключения к SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error('Ошибка подключения:', error);
    } else {
        console.log('Сервер готов к отправке писем');
    }
});

// Маршрут для приёма формы
app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL,
        subject: `Сообщение с сайта: ${subject}`,
        text: `
            Имя: ${name}
            Email: ${email}
            Сообщение: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка отправки:', error);
            res.status(500).json({ status: 'fail', message: 'Ошибка отправки' });            
        } else {            
            res.json({ status: 'success', message: 'Сообщение отправлено' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});