import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { api } from "../services/api";
import "../styles/ActionCard.styles.css";

export const ActionCard = () => {
  const [amount, setAmount] = useState("");
  const [movementName, setMovementName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { setBalance, setMovements, setMoneyHistory } =
    useContext(UserContext);

  const handleBalance = async (amountF, increment) => {
    const numAmount = parseFloat(amountF);
    if (!numAmount || numAmount <= 0) return;
    if (!movementName || movementName.length < 1) return;

    const action = increment ? "+" : "-";

    setSubmitting(true);
    try {
      const { movement, balance: newBalance } = await api.movements.create(
        movementName,
        numAmount,
        action
      );

      setBalance(newBalance);
      setMovements((prev) => [movement, ...prev]);
      setMoneyHistory((prev) => ({
        income: increment ? prev.income + numAmount : prev.income,
        consume: !increment ? prev.consume + numAmount : prev.consume,
      }));

      setAmount("");
      setMovementName("");
    } catch (err) {
      console.error("Error creating movement:", err);
    } finally {
      setSubmitting(false);
    }
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
            disabled={submitting}
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
            disabled={submitting}
          />
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-income"
          onClick={() => handleBalance(amount, true)}
          disabled={submitting}
        >
          ↑ Ingreso
        </button>
        <button
          className="btn btn-expense"
          onClick={() => handleBalance(amount, false)}
          disabled={submitting}
        >
          ↓ Gasto
        </button>
      </div>
    </div>
  );
};
