import { useState, useEffect } from "react";
import { transfer } from "../../api/transaction.api";
import { searchProductsByNumber } from "../../api/product.api";
import "./styles/TransferModal.css";
import { useProduct } from "../../auth/useProduct";
import { useNotification } from "../../auth/useNotification";
import { AxiosError } from "axios";
import type { ProductResponseWithClient } from "../../api/interfaces/product.interfaces";

interface TransferModalProps {
  actualProductNumber: string;
  onClose: () => void;
  originProductId: number;
}

function TransferModal({ onClose, originProductId, actualProductNumber }: TransferModalProps) {
  const [amount, setAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinyProductId, setDestinyProductId] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<ProductResponseWithClient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { setModifiedProducts } = useProduct();
  const { showNotification } = useNotification();

  // Búsqueda dinámica cuando el usuario escribe
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      try {
        const results = await searchProductsByNumber(searchTerm);
        setSearchResults(results.content);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = axiosError.response?.data as any;
        const message =
          errorMessage?.message ||
          "Error al buscar cuentas. Por favor intente de nuevo.";
        showNotification(message);
        console.error("Error en la búsqueda:", message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [searchTerm]);

  async function handleConfirm() {
    if (!destinyProductId || amount <= 0) {
      showNotification(
        "Por favor ingrese una cuenta de destino y un monto válido"
      );
      return;
    }

    try {
      await transfer({
        amount,
        originProductId,
        destinyProductId,
      });
      setModifiedProducts(true);
      onClose();
      showNotification("Transferencia realizada exitosamente");
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message =
        errorMessage?.message ||
        "Error en la transferencia. Por favor intente de nuevo.";
      showNotification(message);
      console.error("Error en la transferencia:", message);
    }
  }

  const handleSelectAccount = (product: ProductResponseWithClient) => {
    setSearchTerm(product.productNumber);
    setDestinyProductId(product.id);
    setSearchResults([]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Transferir Dinero</h2>

        <div className="search-box">
          <input
            className="modal-input input-transfer"
            type="text"
            placeholder="Número de cuenta o nombre..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDestinyProductId(null);
            }}
          />

          {searchTerm && !destinyProductId && searchResults.length > 0 && (
            <div className="results-list">
              {searchResults.filter((product) => product.productNumber !== actualProductNumber).map((product) => (
                <div
                  key={product.id}
                  className="result-item"
                  onClick={() => handleSelectAccount(product)}
                >
                  <p className="item-name">
                    {product.client.firstName} {product.client.lastName}
                  </p>
                  <p className="item-number">{product.productNumber} {product.productType}</p>
                </div>
              ))}
            </div>
          )}

          {searchTerm && !destinyProductId && searchResults.length === 0 && !isSearching && (
            <div className="results-list">
              <div className="result-item no-results">
                <p>No se encontraron cuentas</p>
              </div>
            </div>
          )}

          {isSearching && (
            <div className="results-list">
              <div className="result-item searching">
                <p>Buscando...</p>
              </div>
            </div>
          )}
        </div>

        <input
          className="modal-input input-transfer no-arrows"
          type="number"
          value={amount === 0 ? "" : amount}
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