const express = require('express');
const User = require('../models/user');
const app = express();
const router = express.Router();

app.use(express.json());

// router.post('/createuser', [
//     body('email', 'Please enter a valid email').isEmail(),
//     body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
//     // body('phone').isMobilePhone,
//   ], async (req, res) => {
  
//     console.log("I am hit")
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(402).json({ errors: errors.array() });
//       console.log({ errors })
//     }

//     const saltRounds = await bcrypt.genSalt(10);
//     let secPass = await bcrypt.hash(req.body.pass, saltRounds)
  
//     try {
//       await User.create({
//         email: req.body.email,
//         pass: secPass,
//         username: req.body.username
//       })
  
  
//       res.json({ success: true })
//       console.log("Account Created")
  
  
//     } catch (error) {
//       console.log(error)
//       res.json({ success: false })
//     }
  
//   });

//   router.post('/login', [
//     body('email', 'Please enter a valid email').isEmail(),
//     body('pass', 'Password length should be minimum 5 letters').isLength({ min: 5 }),
//   ], async (req, res) => {
  
  
//     const errors = validationResult(req);
  
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//       console.log(errors)
//     }
//     const { email, pass } = req.body
//     try {
  
//       const user = await User.findOne({ email });
//       console.log(user);
//       if (!user) {
//         return res.status(400).json({ errors: "Login with correct credentials" });
//       }
  
//       if (!user.pass) {
//         return res.status(400).json({ errors: "Password not found" });
//       }
  
//       const pwdCompare = await bcrypt.compare(pass, user.pass)
//       if (!pwdCompare) {
//         return res.status(402).json({ errors: "Login with correct credentials" })
//       }
  
  
//       const data = {
//         userr: {
//           id: user._id
//         }
//       }
  
//       // console.log(data);
  
//       const authToken = jwt.sign(data, Signature)
//       // await User.findByIdAndUpdate(user._id,{isOnline: true, isOffline: false})
//       res.json({ success: true, authToken: authToken })
//       console.log("Logged in SuccessFully")
  
  
//     } catch (error) {
//       console.log(error)
//       res.json({ success: false })
//     }
  
//   });

  router.get('/test', async (req, res) => {
    try {
      Place.find()
      .then(Users=>res.json(User))
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;