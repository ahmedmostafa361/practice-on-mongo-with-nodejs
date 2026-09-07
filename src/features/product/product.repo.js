const db = require('../../common/db/mongodb');

const createProduct = async (productData) => {
    const {insertedId} = await db.collection('products').insertOne(productData);
    return insertedId;
};

const getAllProducts = async (limit = 5 , skip = 0) => {
    // const products = await db.collection('products').find().limit(limit).skip(skip).toArray();
    // return products;
    const products = await db.collection('products').aggregate(
        [
            { $match: {
                status: { $eq: 'active'}
                } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'seller' /// seller is array
                }
            },
            {$unwind:
                    {
                        path: '$seller',
                        preserveNullAndEmptyArrays: true /// if seller is empty array then it will not be removed very important
                    }
            }, /// we use unwind to convert the seller from array to object
            {
                $project: {  /// we use project to select only the required fields from the seller object
                    "seller.name": 1,
                    "seller.email": 1,
                    "seller.phone": 1,
                    _id: 1,
                    name: 1,
                    price: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    status: 1,
                }
            }

        ]
    ).toArray();
    return products;
};

module.exports = { createProduct , getAllProducts};

/// output
/*
{
    "message": "gets all products successfully",
    "success": true,
    "data": [
        {
            "_id": "6a9e88274fb288dab1df6225",
            "name": "nike",
            "price": 100000,
            "createdAt": "2026-09-07T09:47:19.764Z",
            "updatedAt": "2026-09-07T09:47:19.764Z",
            "status": "active",
            "seller": {
                "email": "ahmed1@gmail.com",
                "phone": "01063000601"
            }
        },
        {  /// this come because we use unwind preserveNullAndEmptyArrays: true
            "_id": "6a9e84114fb288dab1df6224",
            "name": "3lbt zbady",
            "price": 100000,
            "createdAt": "2026-09-07T09:29:53.821Z",
            "updatedAt": "2026-09-07T09:29:53.821Z",
            "status": "active"
        }
    ]
}*/