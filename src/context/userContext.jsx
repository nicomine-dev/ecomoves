import { createContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { api } from "../services/api";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [movements, setMovements] = useState([]);
  const [moneyHistory, setMoneyHistory] = useState({ income: 0, consume: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        const [profile, movs, summary] = await Promise.all([
          api.users.me(),
          api.movements.list(),
          api.movements.summary(),
        ]);

        setName(profile.name);
        setBalance(Number(profile.balance));
        setMovements(movs);
        setMoneyHistory(summary);
      } catch (err) {
        console.error("Error loading user data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const value = {
    name,
    setName,
    balance,
    setBalance,
    movements,
    setMovements,
    moneyHistory,
    setMoneyHistory,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
