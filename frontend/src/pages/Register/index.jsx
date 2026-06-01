import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../services/authService';
import './Register.css';

const GENDER_OPTIONS = ['Masculino', 'Femenino', 'Prefiero no decir'];

export default function Register() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const [form, setForm] = useState({
    full_name: '', email: '', password: '', confirm: '', gender: '', age: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      return setError('Las contraseñas no coinciden.');
    }
    if (form.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    setLoading(true);
    try {
      const data = await registerUser({
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        gender: form.gender,
        age: Number(form.age),
      });
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
          <h1 className="auth-card__title">Crea tu cuenta</h1>
          <p className="auth-card__sub">Empieza tu camino vocacional hoy.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__field">
            <label className="auth-form__label">Nombre completo</label>
            <input
              className="auth-form__input"
              type="text"
              placeholder="Ej. Juan Pérez"
              value={form.full_name}
              onChange={set('full_name')}
              required
            />
          </div>

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

          <div className="auth-form__row">
            <div className="auth-form__field">
              <label className="auth-form__label">Sexo</label>
              <select
                className="auth-form__input auth-form__select"
                value={form.gender}
                onChange={set('gender')}
                required
              >
                <option value="" disabled>Seleccionar</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="auth-form__field">
              <label className="auth-form__label">Edad</label>
              <input
                className="auth-form__input"
                type="number"
                placeholder="Ej. 17"
                min="10"
                max="100"
                value={form.age}
                onChange={set('age')}
                required
              />
            </div>
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Contraseña</label>
            <input
              className="auth-form__input"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={set('password')}
              required
            />
          </div>

          <div className="auth-form__field">
            <label className="auth-form__label">Confirmar contraseña</label>
            <input
              className="auth-form__input"
              type="password"
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={set('confirm')}
              required
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__submit" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="auth-card__link">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
