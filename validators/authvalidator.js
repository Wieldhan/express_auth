// validators/authValidator.js
const validator = require('validator');

exports.validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    // Validasi username
    if (!username || username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    // Validasi email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validasi password kompleks
    if (
        !password ||
        password.length < 6 ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return res.status(400).json({
            error: 'Password must be at least 6 characters and contain and letters'
        });
    }

    next();
};
