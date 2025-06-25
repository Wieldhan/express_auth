const supabase = require('../services/supabaseClient');
const validator = require('validator');

exports.getUsers = async (req, res) => {
    const { data, error } = await supabase.from('users').select('id, username, email, role, created_at');
    if (error) return res.status(400).json({ error });
    res.json(data);
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('users')
        .select('id, username, email, role, created_at')
        .eq('id', id)
        .single(); // Hanya ambil satu data

    if (error) return res.status(404).json({ error: 'User Tidak Ditemukan' });

    res.json(data);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    const { data, error } = await supabase
        .from('users')
        .update({ username, email, role })
        .eq('id', id);
    if (error) return res.status(400).json({ error });

    res.json({ message: 'User Data Berhasil Diupdate', data });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) return res.status(400).json({ error });

    res.json({ message: 'User Data Berhasil Dihapus' });
};
