const express = require('express')
const useRouter = express.Router()
const { isSignedIn } = require('./controller/auth');


//
const loginRouter = require('./routes/loginRouter');
useRouter.use('/login', loginRouter)
//
const signupRouter = require('./routes/signupRouter');
useRouter.use('/signup', signupRouter)
//
const roomRouter = require('./routes/roomRouter');
useRouter.use('/croom', roomRouter)
//
const codeRouter = require('./routes/codeRouter');
useRouter.use('/code', codeRouter)

useRouter.use('/test', isSignedIn, (req, res) => {
    res.send("protected route!")
})


module.exports = useRouter