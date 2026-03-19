import { useContext } from "react";
import { UserContext } from "../context/userContext";
import "../styles/Profile.styles.css";

export const Profile = () => {
  const { name, balance, moneyHistory } = useContext(UserContext);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("es-AR", {
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(number);
  };

  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{initial}</div>
        <div className="profile-info">
          <p className="profile-name">{name}</p>
          <p className="profile-label">Mi cuenta</p>
        </div>
      </div>

      <div className="balance-section">
        <p className="balance-label">Balance actual</p>
        <p className={`balance-amount ${balance < 0 ? "negative" : ""}`}>
          ${formatNumber(balance)}
        </p>
      </div>

      <p className="stats-label">Resumen financiero</p>
      <div className="stats-grid">
        <div className="stat-item income">
          <span className="stat-icon">↑</span>
          <span className="stat-label">Ingresos</span>
          <span className="stat-amount">
            ${moneyHistory?.income > 0 ? formatNumber(moneyHistory.income) : "0"}
          </span>
        </div>
        <div className="stat-item expense">
          <span className="stat-icon">↓</span>
          <span className="stat-label">Gastos</span>
          <span className="stat-amount">
            ${moneyHistory?.consume > 0 ? formatNumber(moneyHistory.consume) : "0"}
          </span>
        </div>
      </div>
    </div>
  );
};
