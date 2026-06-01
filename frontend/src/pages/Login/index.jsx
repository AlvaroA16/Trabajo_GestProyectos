import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/authService';
import '../Register/Register.css';

export default function Login() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(form);
      saveSession(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__brand">
            <span className="auth-card__brand-icon">D</span>
            Decide Hoy
          </Link>
          <h1 className="auth-card__title">Bienvenido de vuelta</h1>
          <p className="auth-card__sub">Ingresa con tu cuenta para continuar.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label className="auth-form__label">Correo electrónico</label>
            <input
              className="auth-form__input"
              type="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Contraseña</label>
            <input
              className="auth-form__input"
              type="password"
              placeholder="Tu contraseña"
              value={form.password}
              onChange={set('password')}
              required
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="auth-card__link">Regístrate gratis</Link>
        </p>
      </div>
    </main>
  );
}
