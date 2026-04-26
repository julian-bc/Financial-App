import { useState } from "react";
import { saveProduct } from "../../api/product.api";
import "./styles/CreateAccountModal.css";
import { useProduct } from "../../auth/useProduct";
import { useNotification } from "../../auth/useNotification";
import useSession from "../../auth/useSession";
import { AxiosError } from "axios";
import type { ProductRequest } from "../../api/interfaces/product.interfaces";

interface CreateAccountModalProps {
  onClose: () => void;
  accountType: "AHORROS" | "CORRIENTE";
}

function CreateAccountModal({ onClose, accountType }: CreateAccountModalProps) {
  const { setModifiedProducts } = useProduct();
  const { showNotification } = useNotification();
  const { user } = useSession();

  const [isActive, setIsActive] = useState(true);
  const [gmfExempt, setGmfExempt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {
    setIsLoading(true);
    try {
      const productData: ProductRequest = {
        clientId: user.id,
        productType: accountType,
        productState: isActive ? "ACTIVE" : "INACTIVE",
        gmfExempt: gmfExempt,
      };
      console.log(productData);
      await saveProduct(productData);
      onClose();
      showNotification(`Cuenta ${accountType} creada exitosamente`);
      setModifiedProducts(true);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as any;
      const message =
        errorMessage?.message ||
        "Error al crear la cuenta. Por favor intente de nuevo.";
      showNotification(message);
      console.error(`Error al crear cuenta: ${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content create-account-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Crear Cuenta de {accountType}</h2>
        <p className="modal-description">
          Configura tu nueva cuenta con las opciones que prefieras
        </p>

        {/* Switch Estado */}
        <div className="modal-switch-group">
          <label className="modal-switch-label">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={isLoading}
              className="modal-checkbox"
            />
            <span className="modal-switch-text">
              Estado: {isActive ? "Activa" : "Inactiva"}
            </span>
          </label>
        </div>

        {/* Switch GMF Exempt */}
        <div className="modal-switch-group">
          <label className="modal-switch-label">
            <input
              type="checkbox"
              checked={gmfExempt}
              onChange={(e) => setGmfExempt(e.target.checked)}
              disabled={isLoading}
              className="modal-checkbox"
            />
            <span className="modal-switch-text">
              GMF Exento: {gmfExempt ? "Sí" : "No"}
            </span>
          </label>
        </div>

        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className="btn-confirm-create"
            onClick={handleCreate}
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Cuenta"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;
