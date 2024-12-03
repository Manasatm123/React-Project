import userSchema from "./model/user.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manasaworkmail123@gmail.com",
    pass: "tcnb knag emrk elfs",
  },
});

export async function addUser(req, res) {
 console.log(req.body);
 
  const { username, email, pwd, cpwd } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    if (!(username && email && pwd && cpwd))
      return res.status(500).send({ msg: "fields are empty" });
    if (pwd != cpwd) return res.status(500).send({ msg: "pass not match" });
    bcrypt
      .hash(pwd, 10)
      .then((hpwd) => {
        userSchema.create({ username, email, pass: hpwd });
        res.status(201).send({ msg: "Successfull" });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.status(500).send({ asd: "email already used " });
  }
}

export async function login(req, res) {
  console.log("hi");
  
  console.log(req.body);
  
  
  const { email, pass } = req.body;
  if (!(email && pass))
    return res.status(500).send({ msg: "fields are empty" });
  const user = await userSchema.findOne({ email });
  if (!user) return res.status(500).send({ msg: "email donot exist" });
  const success = await bcrypt.compare(pass, user.pass);
  
  if (success !== true)
    return res.status(500).send({ msg: "email or password not exist" });
  const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });
 
  res.status(201).send({ token });
}

export async function verifyEmail(req, res) {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(500).send({ msg: "fields are empty" });
  }
  const user = await userSchema.findOne({ email });
  if (!user) {
    const info = await transporter.sendMail({
      from: "manasaworkmail123@gmail.com", 
      to: email, 
      subject: "verify", 
      text: "VERIFY! your email",  
      html: `
   <div style="text-align: center; margin-top: 50px;">
            <h2>Verify Your Email</h2>
            <p>Click the button below to verify your email and complete registration.</p>
            <a href="http://localhost:5173/Register"> 
               <button style="padding: 10px 50px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
              Verify Email</button>
            </a>
          </div>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(201).send({ msg: "Verificaton email sented" });
  } else {
    return res.status(500).send({ msg: "email already exist" });
  }
}

export async function getdata(req, res) {
  const data = await userSchema.find();
  res.status(200).send(data);
}
