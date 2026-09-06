const {createUserService} = require('./user.service');
const createUserController = async (req,res,next) => {
    try {
        const insertedId =await createUserService(req.body);
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: insertedId
        });
    }catch (error){
        next(error);
    }
}
module.exports = {createUserController};