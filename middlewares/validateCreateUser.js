const validator = require('validator');

module.exports = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).json({ error: 'Username harus lebih dari 3 karakter' });
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Format email tidak sah' });
    }

    if (
        !password || password.length < 6 ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return res.status(400).json({
            error: 'Password harus lebih dari 6 karakter dan mengandung huruf dan angka'
        });
    }

    next();
};
