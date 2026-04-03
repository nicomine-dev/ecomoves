import "animate.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "../styles/Movements.styles.css";

export const Movements = () => {
  const { movements } = useContext(UserContext);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Backend already returns movements ordered by created_at desc
  const reversedMovements = movements || [];

  return (
    <div className="movements-container">
      <div className="movements-header">
        <p className="movements-title">
          Movimientos
          {movements?.length > 0 && (
            <span className="movements-count">{movements.length}</span>
          )}
        </p>
        <p className="movements-subtitle">Historial de transacciones</p>
      </div>

      <div className="movements-divider" />

      {movements?.length > 0 ? (
        <div className="movements-list">
          {reversedMovements.map((movement, index) => (
            <div
              key={index}
              className="movement-item animate__animated animate__fadeIn"
              style={{ animationDuration: "0.25s" }}
            >
              <div className={`movement-icon ${movement.action === "+" ? "income-icon" : "expense-icon"}`}>
                {movement.action === "+" ? "↑" : "↓"}
              </div>
              <div className="movement-info">
                <p className="movement-name">{movement.name}</p>
                <p className="movement-date">{movement.date}</p>
              </div>
              <span className={`movement-amount ${movement.action === "+" ? "income-amount" : "expense-amount"}`}>
                {movement.action}${formatAmount(movement.amount)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">📊</span>
          <p className="empty-text">Aún no hay transacciones registradas</p>
        </div>
      )}
    </div>
  );
};
