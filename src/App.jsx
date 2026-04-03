import "./App.css";
import { useAuth } from "./context/authContext";
import { Auth } from "./components/Auth";
import { Profile } from "./components/Profile";
import { ActionCard } from "./components/ActionCard";
import { Movements } from "./components/Movements";

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <p className="loading-text">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app-container">
      <div className="left-column">
        <Profile />
        <ActionCard />
        <button className="btn-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
      <Movements />
    </div>
  );
}

export default App;
