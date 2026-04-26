import { useState } from "react";
import { withdraw } from "../../api/transaction.api";
import "./styles/WithdrawModal.css";
import { useProduct } from "../../auth/useProduct";

interface WithdrawModalProps {
  onClose: () => void;
  originProductId: number;
}

function WithdrawModal({ onClose, originProductId }: WithdrawModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const { setModifiedProducts } = useProduct();

  async function handleConfirm() {    
    try {
      await withdraw({ amount, originProductId });
      setModifiedProducts(true);
      onClose();
    } catch (error) {
      console.error(`Error al retirar: ${error}`);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Retirar Dinero</h2>
        
        <input
          className="modal-input-withdraw"
          type="number"
          value={amount === 0 ? '' : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Monto a retirar"
          autoFocus
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm-withdraw" onClick={handleConfirm}>
            Retirar
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal