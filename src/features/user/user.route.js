const {Router} = require('express');
const userRouter = Router();
const {createUserController} = require('./user.controller');
userRouter.post('/register', createUserController);

module.exports = userRouter;