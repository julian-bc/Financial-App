import { useState } from "react"
import { consign } from "../../api/transaction.api";
import "./styles/DepositModal.css";

interface DepositModalProps {
  onClose: () => void;
}

function DepositModal ({ onClose }: DepositModalProps) {
  const [amount, setAmount] = useState(0);
  const destinyProductId = Number(localStorage.getItem("currentProductId"));

  async function handleConfirm() {    
    try {
      await consign({ amount, destinyProductId });
      onClose();
    } catch (error) {
      console.error(`Error consignando= ${error}`);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Depositar</h2>
        
        <input
          className="modal-input"
          type="number"
          value={amount === 0 ? '' : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Monto a consignar"
          autoFocus
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            Consignar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositModal