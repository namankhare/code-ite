const express = require('express')
const useRouter = express.Router()
const { isSignedIn } = require('./controller/auth');

//Authentication Router
const authRouter = require('./routes/authRouter');
useRouter.use('/auth', authRouter);

//Create new room router
const roomRouter = require('./routes/roomRouter');
useRouter.use('/croom', roomRouter)

//compile code router
const codeRouter = require('./routes/codeRouter');
useRouter.use('/code', codeRouter)

//for testing purpose
useRouter.use('/test', isSignedIn, (req, res) => {
    res.send("protected route!")
})

module.exports = useRouter