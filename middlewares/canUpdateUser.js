module.exports = (req, res, next) => {
    // console.log('[canUpdateUser] req.user:', req.user);
    // console.log('[canUpdateUser] req.params.id:', req.params.id);

    const user = req.user;
    const targetId = req.params.id;

    if (user.role === 'administrator') {
        // console.log('Access granted: user is administrator');
        return next();
    }

    if (user.id.toString() === targetId.toString()) {
        // console.log('Access granted: user updates own data');
        return next();
    }

    // console.log('Access denied');
    return res.status(403).json({ error: 'Anda tidak memiliki izin untuk mengupdate user ini' });
};
