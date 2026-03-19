import "./App.css";
import { Profile } from "./components/Profile";
import { ActionCard } from "./components/ActionCard";
import { Movements } from "./components/Movements";

function App() {
  return (
    <div className="app-container">
      <div className="left-column">
        <Profile />
        <ActionCard />
      </div>
      <Movements />
    </div>
  );
}

export default App;
