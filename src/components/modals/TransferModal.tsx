import { useState } from "react";
import { transfer } from "../../api/transaction.api";
import "./styles/TransferModal.css";
import { useProduct } from "../../auth/useProduct";
import { useNotification } from "../../auth/useNotification";
import { AxiosError } from "axios";

interface TransferModalProps {
  onClose: () => void;
  originProductId: number;
}

function TransferModal({ onClose, originProductId }: TransferModalProps) {
  const [amount, setAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinyProductId, setDestinyProductId] = useState<number | null>(null);
  const { setModifiedProducts } = useProduct();
  const { showNotification } = useNotification();

  // supone un fetch de cuentas de manera dynamica segun parametro de busqueda del numero de cuenta
  const accounts = [
    { id: 101, number: "5544-2233", name: "Juan Pérez" },
    { id: 102, number: "9988-7766", name: "María López" },
    { id: 103, number: "1122-3344", name: "Carlos Ruiz" },
  ];

  const filtered = accounts.filter(acc => 
    acc.number.includes(searchTerm) || 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleConfirm() {
    const finalDestinyId = destinyProductId || Number(searchTerm);

    if (!finalDestinyId || amount <= 0) {
      showNotification("Por favor ingrese una cuenta de destino y un monto válido");
      return;
    }

    try {
      await transfer({ 
        amount, 
        originProductId, 
        destinyProductId: finalDestinyId 
      });
      setModifiedProducts(true);
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message = errorMessage?.message || "Error en la transferencia. Por favor intente de nuevo.";
      showNotification(message);
      console.error("Error en la transferencia:", message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Transferir Dinero</h2>

        <div className="search-box">
          <input
            /* Clase específica añadida: input-transfer */
            className="modal-input input-transfer" 
            type="text"
            placeholder="Número de cuenta o nombre..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDestinyProductId(null);
            }}
          />
          
          {searchTerm && !destinyProductId && filtered.length > 0 && (
            <div className="results-list">
              {filtered.map(acc => (
                <div 
                  key={acc.id} 
                  className="result-item" 
                  onClick={() => {
                    setSearchTerm(acc.number);
                    setDestinyProductId(acc.id);
                  }}
                >
                  <p className="item-name">{acc.name}</p>
                  <p className="item-number">{acc.number}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          /* Clase específica añadida: input-transfer */
          className="modal-input input-transfer no-arrows"
          type="number"
          value={amount === 0 ? '' : amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Monto a enviar"
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm-transfer" onClick={handleConfirm}>
            Transferir
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;