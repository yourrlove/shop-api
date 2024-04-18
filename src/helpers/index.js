const { v4: uuidv4 } = require('uuid');

const generateUUID = () => uuidv4();

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

module.exports = {
    generateUUID,
    asyncHandler
};