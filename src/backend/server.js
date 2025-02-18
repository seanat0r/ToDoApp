const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 8080;

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json()); 

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "XXX@gmail.com", //* Your email
		pass: "XXX", //* Your password
	},
});

app.post("/send-email", (req, res) => {
	const { subject, text } = req.body;

	const mailOptions = {
		from: "XXX@gmail.com", //* Your email
		to: "XXX@gmail.com", //* Your email
		subject: subject || "ToDo today schedule",
		text: text || "No tasks for today",
	};

	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        } else {
            
            return res.status(200).json({ message: `Email sent: ${info.response}` });
        }
    });
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
