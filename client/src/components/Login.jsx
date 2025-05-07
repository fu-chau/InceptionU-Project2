import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSuccess }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setMessage('⚠️ Both fields are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    console.log("🧪 handleSubmit() called");
    e.preventDefault();
    setMessage('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      // error trap
      console.log('➡️ Submitting login form to:', `${baseURL}/api/auth/login`);
      console.log('➡️ Payload:', form);

      const res = await axios.post(`${baseURL}/api/auth/login`, form);
      login(res.data.user, res.data.token);
      setMessage('✅ Logged in!');
      if (onSuccess) onSuccess();
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage('❌ Incorrect email or password.');
      } else {
        setMessage(err.response?.data?.message || '❌ Login failed. Try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
