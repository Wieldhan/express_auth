const supabase = require('../services/supabaseClient');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, email, password: hash }]);

    if (error) return res.status(400).json({ error });
    res.json({ message: 'User Berhasil Dibuat' });
};

exports.login = async (req, res) => {
    const { identifier, password } = req.body;

    const { data: user, error } = await supabase
        .from('users')
        .select()
        .or(`email.eq.${identifier},username.eq.${identifier}`)
        .maybeSingle();

    if (error || !user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Username / Email dan Password Salah' });
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        username: user.username
    });

    res.json({ token });
};
