const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'] // Allowed headers
}));

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post('/send-email', (req, res) => {
  const { name, lname, email, number, message } = req.body;

  const mailOptions = {
    from: 'shstore62@gmail.com',
    to: 'obliqware@gmail.com',
    subject: 'New Contact Form Submission - Obliqware',
    text: `
      <h1>Obliqware Contact Us</h1>
      First Name: ${name}
      Last Name: ${lname}
      Email: ${email}
      Number: ${number}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.options('/send-email', cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
