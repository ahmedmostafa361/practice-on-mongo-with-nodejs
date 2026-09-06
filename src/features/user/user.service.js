const { checkUserExistsByEmailOrPhone , createUser } = require('./user.repo');

const createUserService = async (userData) => {
    /// 1.check if user exists => make a query
    const user = await checkUserExistsByEmailOrPhone(userData.email,userData.phone);
    /// 2 if yes throw error
    if(user) throw new Error('User already exists');
    /// 3. save user into db
    const insertedId = await createUser(userData);
    if(!insertedId) throw new Error('User not created');
    return insertedId;
};

module.exports = {createUserService};