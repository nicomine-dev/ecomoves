import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import "../styles/ActionCard.styles.css";

export const ActionCard = () => {
  const [amount, setAmount] = useState("");
  const [movementName, setMovementName] = useState("");

  const { setBalance, setMovements, balance, moneyHistory, setMoneyHistory } =
    useContext(UserContext);

  const dateString = new Date();

  const handleBalance = (amountF, increment) => {
    parseFloat(amountF);
    if (amountF <= 0) return;
    if (!movementName || movementName.length < 1) return;

    let action = increment ? "+" : "-";

    if (increment) {
      setBalance((prevState) => prevState + amountF);
      localStorage.setItem("balance", balance + amountF);
      let totalMoneyIncome = {
        income: moneyHistory.income + amountF,
        consume: moneyHistory.consume,
      };
      setMoneyHistory(totalMoneyIncome);
      localStorage.setItem("moneyHistory", JSON.stringify(totalMoneyIncome));
    } else {
      setBalance((prevState) => prevState - amountF);
      localStorage.setItem("balance", balance - amountF);
      let totalMoneyConsume = {
        income: moneyHistory.income,
        consume: moneyHistory.consume + amountF,
      };
      setMoneyHistory(totalMoneyConsume);
      localStorage.setItem("moneyHistory", JSON.stringify(totalMoneyConsume));
    }

    setMovements((prevState) => [
      ...prevState,
      {
        name: movementName,
        amount: amount,
        action: action,
        date: dateString.toLocaleDateString(),
      },
    ]);

    const stored = JSON.parse(localStorage.getItem("movements") || "[]");

    localStorage.setItem(
      "movements",
      JSON.stringify([
        ...stored,
        {
          name: movementName,
          amount: amount,
          action: action,
          date: dateString.toLocaleDateString(),
        },
      ])
    );

    setAmount("");
    setMovementName("");
  };

  return (
    <div className="action-card-container">
      <p className="action-title">Añadir movimiento</p>
      <p className="action-subtitle">Registrá tus ingresos y gastos</p>

      <div className="input-group">
        <div className="field-wrapper">
          <label className="field-label">Movimiento</label>
          <input
            className="field-input"
            onChange={(e) => setMovementName(e.target.value)}
            placeholder="Nombre del movimiento"
            type="text"
            value={movementName}
          />
        </div>
        <div className="field-wrapper">
          <label className="field-label">Monto</label>
          <input
            className="field-input"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.00"
            type="number"
            value={amount}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-income"
          onClick={() => handleBalance(amount, true)}
        >
          ↑ Ingreso
        </button>
        <button
          className="btn btn-expense"
          onClick={() => handleBalance(amount, false)}
        >
          ↓ Gasto
        </button>
      </div>
    </div>
  );
};
