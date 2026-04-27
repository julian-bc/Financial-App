import { useState } from "react"
import { consign } from "../../api/transaction.api";
import "./styles/DepositModal.css";
import { useProduct } from "../../auth/useProduct";
import { useTransaction } from "../../auth/useTransaction";
import { useNotification } from "../../auth/useNotification";
import { AxiosError } from "axios";

interface DepositModalProps {
  onClose: () => void;
  originProductId: number;
}

function DepositModal ({ onClose, originProductId }: DepositModalProps) {
  const [amount, setAmount] = useState(0);
  const { setModifiedProducts } = useProduct();
  const { setModifiedTransactions } = useTransaction();
  const { showNotification } = useNotification();

  async function handleConfirm() {    
    try {
      await consign({ amount, originProductId });
      setModifiedProducts(true);
      setModifiedTransactions(true);
      onClose();
      showNotification("Depósito realizado exitosamente");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message = errorMessage?.message || "Error al consignar. Por favor intente de nuevo.";
      showNotification(message);
      console.error(`Error consignando: ${message}`);
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