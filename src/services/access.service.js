'use strict';
const bcrypt = require('bcrypt');
const db = require('../models/index');

class AccessService {
    static signUp = async ({ }) => {
        // step1: check email exist?

        const password = await bcrypt.hash(password, 10);
        
        // step2: create new user
        
    }
}