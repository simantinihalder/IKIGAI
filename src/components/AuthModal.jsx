import React, { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithEmail, logInWithEmail } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      if (isLoginView) {
        const { error } = await logInWithEmail(email, password);
        if (error) throw error;
        onClose(); // Close on success
      } else {
        const { error } = await signUpWithEmail(email, password);
        if (error) throw error;
        setSuccessMsg('Account created successfully! You may now log in.');
        setIsLoginView(true);
        setPassword('');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-backdrop" onClick={onClose}></div>
      <div className="auth-modal-content">
        <button className="auth-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div className="auth-modal-header">
          <p className="gold-text">IKIGAI EXCLUSIVE</p>
          <h2 className="serif-heading auth-modal-title">
            {isLoginView ? 'Log In to Your Account' : 'Create an Account'}
          </h2>
          <p className="auth-modal-desc">
            {isLoginView
              ? 'Access your reservations, past orders, and curated culinary experiences.'
              : 'Join our inner circle for priority reservations and bespoke omakase access.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMsg && <div className="auth-error">{errorMsg}</div>}
          {successMsg && <div className="auth-success">{successMsg}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yuzu@ikigai.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="crimson-btn auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : (isLoginView ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-modal-footer">
          <p>
            {isLoginView ? "Don't have an account?" : "Already a member?"}{' '}
            <button className="auth-toggle-btn gold-text" onClick={toggleView}>
              {isLoginView ? 'Create an Account' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
