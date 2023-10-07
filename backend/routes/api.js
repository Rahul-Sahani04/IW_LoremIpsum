const express = require('express');
const User = require('../Models/User');
const app = express();
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Signature = 'Tushar'
router.use(express.json());
const fetchuser = require('../middleware/fetchuser');
require("dotenv").config();


// To Create A user
router.post('/createuser', [
  body('email', 'Please enter a valid email').isEmail(),
  body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
  // body('phone').isMobilePhone,
], async (req, res) => {

  console.log("I am hit")
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ errors: errors.array() });
    console.log({ errors })
  }

  const saltRounds = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.pass, saltRounds)

  try {
    await User.create({
      email: req.body.email,
      pass: secPass,
      username: req.body.username
    })


    res.json({ success: true })
    console.log("Account Created")


  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }

});



// To login the user

router.post('/login', [
  body('email', 'Please enter a valid email').isEmail(),
  body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
], async (req, res) => {


  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    console.log(errors)
  }
  const { email, pass } = req.body
  try {

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ errors: "Login with correct credentials" });
    }

    if (!user.pass) {
      return res.status(400).json({ errors: "Password not found" });
    }

    const pwdCompare = await bcrypt.compare(pass, user.pass)
    if (!pwdCompare) {
      return res.status(402).json({ errors: "Login with correct credentials" })
    }


    const data = {
      userr: {
        id: user._id
      }
    }

    // console.log(data);

    const authToken = jwt.sign(data, Signature)
    // await User.findByIdAndUpdate(user._id,{isOnline: true, isOffline: false})
    res.json({ success: true, authToken: authToken })
    console.log("Logged in SuccessFully")


  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }

});







// Sending a Link to user email to reset password
router.post('/sendLink', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }
  else {

    try {
      const ans = await User.findOne({ "email": email });
      if (ans) {
        const token = jwt.sign({ _id: ans.id }, Signature, {
          expiresIn: '300s'
        });
        console.log(token);
        res.status(200).json(ans);

        const setUserToken = await User.findByIdAndUpdate({ _id: ans.id }, { verify_token: token }, { new: true })


        // Set up a nodemailer SMTP transporter with your email credentials
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 25,
          secure: false,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });

        const message = {
          from: 'Talk o lytic',
          to: email,
          subject: 'Password Reset Link',
          text: `Click the following link to reset your password: https://talkolytic-app.com/ResetPassword/${ans.id}/${token}`,
          html: `<body>
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7;">
              <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);">
                <h2>Hello ${ans.name},</h2>
                <p>We've received a request to reset your password. To proceed with the password reset, click the button below:</p>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="https://talkolytic-app.com/ResetPassword/${ans.id}/${token}" style="background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a>
                </div>
                <p style="margin-top: 20px;">If you didn't request a password reset, you can safely ignore this email.</p>
                <p>Note: This link is valid for 5 minutes.</p>
                <p>Thank you for using Talk o lytic!</p>
              </div>
            </div>
          </body>`
        };


        // Send the email with nodemailer
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
          } else {
            console.log('Email sent: ', info.response);
            res.status(200).json(ans);
          }
        });

        console.log(setUserToken);


      }
      else {
        res.status(401).send({ "message": "User not found", "success": false });
      }

    } catch (error) {
      console.error(error);
    }
  }
})

// Route to change password
router.put('/changePass/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;

    // Check for valid user and token
    const validUser = await User.findOne({ _id: id, verify_token: token });

    if (!validUser) {
      res.status(401).send({ message: 'Invalid User or Token' });
      return;
    }

    // Verify token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, Signature);
    } catch (error) {
      res.status(401).send({ message: 'Authentication failed!' });
      return;
    }

    const { pass } = req.body;
    const saltRounds = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(pass, saltRounds);

    const response = await User.findByIdAndUpdate(id, { pass: secPass });

    if (response) {
      res.status(200).send({ message: 'Password Changed successfully' });
      console.log('Password Changed Successfully');
    } else {
      res.status(500).send({ message: 'Error while changing password' });
      console.log('Problem while changing pass');
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/delete', [
  body('email', 'Please enter a valid email').isEmail(),
  body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
], async (req, res) => {


  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    console.log(errors)
  }
  const { email, pass } = req.body
  try {

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ errors: "Login with correct credentials" });
    }

    if (!user.pass) {
      return res.status(400).json({ errors: "Password not found" });
    }

    const pwdCompare = await bcrypt.compare(pass, user.pass)
    if (!pwdCompare) {
      return res.status(402).json({ errors: "Login with correct credentials" })
    }


    const data = {
      userr: {
        id: user._id
      }
    }

    // console.log(data);

    const authToken = jwt.sign(data, Signature)
    // await User.findByIdAndUpdate(user._id,{isOnline: true, isOffline: false})
    res.json({ success: true, authToken: authToken })
    console.log("Logged in SuccessFully")


  } catch (error) {
    console.log(error)
    res.json({ success: false })
  }

});

module.exports = router;