import { useState } from "react";
import { useAuth } from "../context/authContext";
import "../styles/Auth.styles.css";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) {
          setError("El nombre es requerido");
          setLoading(false);
          return;
        }
        await signup(email, password, name);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-logo">ecoMoves</h1>
          <p className="auth-subtitle">
            {isLogin ? "Iniciá sesión en tu cuenta" : "Creá tu cuenta"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="field-wrapper">
              <label className="field-label">Nombre</label>
              <input
                className="field-input"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <div className="field-wrapper">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="field-wrapper">
            <label className="field-label">Contraseña</label>
            <input
              className="field-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-auth" type="submit" disabled={loading}>
            {loading
              ? "Cargando..."
              : isLogin
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "¿No tenés cuenta?" : "¿Ya tenés cuenta?"}{" "}
          <button
            className="auth-toggle-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Registrate" : "Iniciá sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};
