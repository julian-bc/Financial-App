import { useState, useEffect } from "react";
import Card from "../components/Card";
import "./styles/Account.css";
import {
  MinusCircle,
  PlusCircle,
  Send,
  ShieldAlert,
  ShieldMinus,
  ShieldPlus,
  Trash,
} from "lucide-react";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import DepositModal from "../components/modals/DepositModal";
import WithdrawModal from "../components/modals/WithdrawModal";
import TransferModal from "../components/modals/TransferModal";
import CreateAccountModal from "../components/modals/CreateAccountModal";
import TransactionProvider from "../context/TransactionProvider";
import useSession from "../auth/useSession";
import { useProduct } from "../auth/useProduct";
import { useTransaction } from "../auth/useTransaction";

function AccountContent() {
  const { user } = useSession();
  const {
    userProducts,
    loading,
    setCurrentProductNumber,
    deleteProductHandler,
    activateProduct,
    disableProductHandler,
    cancelProductHandler,
  } = useProduct();
  const { recentTransactions } = useTransaction();

  const [activeType, setActiveType] = useState<"AHORROS" | "CORRIENTE">(
    "AHORROS",
  );
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  // trae las tarjetas de la api, las 2 AHORRO Y CORRIENTE utilizando algun dato del usuario del localstorage guardado como user, para acceder a los datos usar user
  const currentCard =
    userProducts.find((p) => p.productType === activeType) || userProducts[0];
  const hasAccountOfType = userProducts.some(
    (p) => p.productType === activeType,
  );
  const hasMorePages = recentTransactions.length >= 3;

  // Update current product number when currentCard changes
  useEffect(() => {
    if (currentCard && setCurrentProductNumber) {
      setCurrentProductNumber(currentCard.productNumber);
    }
  }, [currentCard, setCurrentProductNumber]);

  const mapProductToCard = (product: typeof currentCard) => {
    if (!product) return null;
    return {
      cardNumber: product.productNumber,
      cardHolder: user.firstName,
      balance: product.balance,
      type:
        product.productType === "AHORROS"
          ? "SAVING"
          : ("CURRENT" as "SAVING" | "CURRENT"),
      status: product.productState as "ACTIVE" | "INACTIVE" | "CANCELLED",
      isExemptGMF: product.gmfExempt,
    };
  };

  const cardData = mapProductToCard(currentCard);

  // Show loading state only if products are being fetched (empty array initially)
  if (userProducts.length === 0 && loading) {
    return (
      <>
        <Navbar name={user.firstName} />
        <div className="account-container">
          <p className="loading-text">Cargando cuentas...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar name={user.firstName} />

      <div className="account-container">
        {!hasAccountOfType ? (
          <button
            className="btn-create-account"
            onClick={() => setIsCreateAccountOpen(true)}
          >
            <span className="create-account-text">
              Crear Cuenta de {activeType}
            </span>
          </button>
        ) : (
          cardData && (
            <Card
              cardNumber={cardData.cardNumber}
              cardHolder={cardData.cardHolder}
              balance={cardData.balance}
              type={cardData.type}
              status={cardData.status}
              isExemptGMF={cardData.isExemptGMF}
            />
          )
        )}

        {hasAccountOfType && (
          <div className="actions-wrapper">
            <button
              className="btn-action deposit"
              onClick={() => setIsDepositOpen(true)}
            >
              <PlusCircle size={20} />
              <span>Depositar</span>
            </button>

            <button
              className="btn-action withdraw"
              onClick={() => setIsWithdrawOpen(true)}
            >
              <MinusCircle size={20} />
              <span>Retirar</span>
            </button>

            <button
              className="btn-action transfer"
              onClick={() => setIsTransferOpen(true)}
            >
              <Send size={20} />
              <span>Transferir</span>
            </button>
          </div>
        )}

        <div className="controls-wrapper">
          <button
            className={`btn-switch ${activeType === "AHORROS" ? "active-saving" : ""}`}
            onClick={() => setActiveType("AHORROS")}
          >
            Cuenta Ahorros
          </button>
          <button
            className={`btn-switch ${activeType === "CORRIENTE" ? "active-current" : ""}`}
            onClick={() => setActiveType("CORRIENTE")}
          >
            Cuenta Corriente
          </button>
        </div>

        {hasAccountOfType && (
          <TransactionList
            transactions={recentTransactions}
            hasMorePages={hasMorePages}
          />
        )}

        {hasAccountOfType && (
          <>
            <div className="actions-wrapper">
              {currentCard && currentCard.productState === "INACTIVE" && (
                <>
                  <button
                    className="btn-action deposit"
                    onClick={() => activateProduct(currentCard.id)}
                  >
                    <ShieldPlus size={20} />
                    <span>Activar</span>
                  </button>
                  <button
                    className="btn-action transfer"
                    onClick={() => cancelProductHandler(currentCard.id)}
                  >
                    <ShieldAlert size={20} />
                    <span>Cancelar</span>
                  </button>
                </>
              )}
              {currentCard && currentCard.productState === "ACTIVE" && (
                <button
                  className="btn-action withdraw"
                  onClick={() => disableProductHandler(currentCard.id)}
                >
                  <ShieldMinus size={20} />
                  <span>Desactivar</span>
                </button>
              )}
            </div>
            <button
              className={"btn-delete-account"}
              onClick={() => {
                if (currentCard) {
                  deleteProductHandler(currentCard.id);
                }
              }}
            >
              <Trash size={20} />
              Eliminar Cuenta
            </button>
          </>
        )}
      </div>

      {isDepositOpen && hasAccountOfType && (
        <DepositModal
          onClose={() => setIsDepositOpen(false)}
          originProductId={currentCard!.id}
        />
      )}

      {isWithdrawOpen && hasAccountOfType && (
        <WithdrawModal
          onClose={() => setIsWithdrawOpen(false)}
          originProductId={currentCard!.id}
        />
      )}

      {isTransferOpen && hasAccountOfType && (
        <TransferModal
          onClose={() => setIsTransferOpen(false)}
          originProductId={currentCard!.id}
          actualProductNumber={currentCard?.productNumber || ""}
        />
      )}

      {isCreateAccountOpen && (
        <CreateAccountModal
          onClose={() => setIsCreateAccountOpen(false)}
          accountType={activeType}
        />
      )}
    </>
  );
}

function Account() {
  const { currentProductNumber } = useProduct();

  return (
    <TransactionProvider productNumber={currentProductNumber}>
      <AccountContent />
    </TransactionProvider>
  );
}

export default Account;
