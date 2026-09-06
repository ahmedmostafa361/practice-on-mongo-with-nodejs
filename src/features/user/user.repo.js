const db = require('../../common/db/mongodb');

const checkUserExistsByEmailOrPhone = async (email,phone) => {
 const user = await db.collection('users').findOne({
     $or: [{ email: {
         $exists: true, $eq: email , $ne: null
         } }, { phone: {
             $exists: true, $eq: phone , $ne: null
         } }]
 });
    return user;
};

const createUser = async (userData) => {
    const {insertedId} = await db.collection('users').insertOne(userData);
    return insertedId;
}

module.exports = { checkUserExistsByEmailOrPhone , createUser };