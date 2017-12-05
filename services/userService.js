const db = require('../models/database');
const jwt = require('jsonwebtoken');
const config = require('../config');

const UserService = function() {}; // eslint-disable-line

UserService.prototype.getUser = async(id) => {
    const result = await db.user.findOne({
        where: {
            id
        }
    });
    return result;
};

UserService.prototype.createUser = async(params) => {
    const transaction = await db.sequelize.transaction();
    try {
        const {
            name,
            email,
            phone,
            address,
            password,
            city,
            state,
            zipCode,
            salary,
            workAddress
        } = params;
        const newUser = {
            name,
            email,
            phone,
            address,
            password,
            city,
            state,
            zipCode,
            salary,
            workAddress
        };
        const user = await db.user.create(newUser, { transaction });
        const jwtToken = jwt.sign({
                email: user.email,
                id: user.id,
                name: user.name
            },
            config.keys.secret, { expiresIn: '30m' }
        );
        const refreshToken = jwt.sign({ email: user.email },
            config.keys.refSecret, { expiresIn: '30d' }
        );
        await transaction.commit();
        const result = {
            refreshToken,
            token: `JWT ${jwtToken}`
        };
        return result;
    } catch (error) {
        await transaction.rollback();
        throw (error);
    }
};

module.exports = new UserService();