const supabase = require('../services/supabaseClient');
const bcrypt = require('bcrypt');

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

    if (error) return res.status(404).json({ error: 'User tidak ditemukan' });
    res.json(data);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        updateData.password = hashedPassword;
    }
    if (role !== undefined) updateData.role = role;
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'Tidak ada data untuk diupdate' });
    }
    const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select();
    if (error) return res.status(400).json({ error });
    if (!data || data.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json({ message: 'Data User Berhasil Diupdate', data });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) return res.status(400).json({ error });
    res.json({ message: 'Data User Berhasil Dihapus' });
};
