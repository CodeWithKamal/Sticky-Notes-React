import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData);
    try {
      await forgotPassword(
        form.email
      );
      setLoading(false);
      navigate('/auth/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="body">
      {error && <p className="error">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        {error}</p>}
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required disabled={loading} />
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : 'Send Reset Link'}
        </button>
        <p className='footer'>
          <span>Remember your password?{' '}</span>
          <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  )
}