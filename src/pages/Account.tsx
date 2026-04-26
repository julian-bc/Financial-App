import { useState } from 'react';
import Card from '../components/Card'
import './styles/Account.css'
import { MinusCircle, PlusCircle, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import TransactionList from '../components/TransactionList';
import { mockTransactions } from '../assets/mockData/transactions';
import DepositModal from '../components/modals/DepositModal';
import WithdrawModal from '../components/modals/WithdrawModal';
import TransferModal from '../components/modals/TransferModal';
import CreateAccountModal from '../components/modals/CreateAccountModal';
import useSession from '../auth/useSession';
import { useProduct } from '../auth/useProduct';

function Account() {
  const { user } = useSession();
  const { userProducts, loading } = useProduct();

  console.log(userProducts);

  const [activeType, setActiveType] = useState<'AHORROS' | 'CORRIENTE'>('AHORROS');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  // trae las tarjetas de la api, las 2 AHORRO Y CORRIENTE utilizando algun dato del usuario del localstorage guardado como user, para acceder a los datos usar user
  const currentCard = userProducts.find(p => p.productType === activeType) || userProducts[0];
  const hasAccountOfType = userProducts.some(p => p.productType === activeType);

  const mapProductToCard = (product: typeof currentCard) => {
    if (!product) return null;
    return {
      cardNumber: product.productNumber,
      cardHolder: user.firstName,
      balance: product.balance,
      type: product.productType === 'AHORROS' ? 'SAVING' : 'CURRENT' as 'SAVING' | 'CURRENT',
      status: product.productState as 'ACTIVE' | 'INACTIVE' | 'CANCELLED',
      isExemptGMF: product.gmfExempt,
    };
  };

  const cardData = mapProductToCard(currentCard);

  // Show loading state only if products are being fetched (empty array initially)
  if (userProducts.length === 0 && loading) {
    return (
      <>
        <Navbar name={user.firstName}/>
        <div className='account-container'>
          <div className='controls-wrapper'>
            <button 
              className={`btn-switch ${activeType === 'AHORROS' ? 'active-saving' : ''}`}
              onClick={() => setActiveType('AHORROS')}
            >
              Cuenta Ahorros
            </button>
            <button 
              className={`btn-switch ${activeType === 'CORRIENTE' ? 'active-current' : ''}`}
              onClick={() => setActiveType('CORRIENTE')}
            >
              Cuenta Corriente
            </button>
          </div>
          <p className="loading-text">Cargando cuentas...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar name={user.firstName}/>

      <div className='account-container'>
        {!hasAccountOfType ? (
          <button 
            className='btn-create-account'
            onClick={() => setIsCreateAccountOpen(true)}
          >
            <span className='create-account-text'>
              Crear Cuenta de {activeType}
            </span>
          </button>
        ) : cardData && (
          <Card 
            cardNumber={cardData.cardNumber}
            cardHolder={cardData.cardHolder}
            balance={cardData.balance}
            type={cardData.type}
            status={cardData.status}
            isExemptGMF={cardData.isExemptGMF}
          />
        )}

        {hasAccountOfType && (
          <div className='actions-wrapper'>
            <button className='btn-action deposit' onClick={() => setIsDepositOpen(true)}>
              <PlusCircle size={20} />
              <span>Depositar</span>
            </button>

            <button className='btn-action withdraw' onClick={() => setIsWithdrawOpen(true)}>
              <MinusCircle size={20} />
              <span>Retirar</span>
            </button>

            <button className='btn-action transfer' onClick={() => setIsTransferOpen(true)}>
              <Send size={20} />
              <span>Transferir</span>
            </button>
          </div>
        )}

        <div className='controls-wrapper'>
          <button 
            className={`btn-switch ${activeType === 'AHORROS' ? 'active-saving' : ''}`}
            onClick={() => setActiveType('AHORROS')}
          >
            Cuenta Ahorros
          </button>
          <button 
            className={`btn-switch ${activeType === 'CORRIENTE' ? 'active-current' : ''}`}
            onClick={() => setActiveType('CORRIENTE')}
          >
            Cuenta Corriente
          </button>
        </div>

        {hasAccountOfType && <TransactionList transactions={mockTransactions}/>}
      </div>

      {isDepositOpen && hasAccountOfType && (
        <DepositModal onClose={() => setIsDepositOpen(false)} originProductId={currentCard!.id} />
      )}
      
      {isWithdrawOpen && hasAccountOfType && (
        <WithdrawModal onClose={() => setIsWithdrawOpen(false)} originProductId={currentCard!.id} />
      )}
      
      {isTransferOpen && hasAccountOfType && (
        <TransferModal onClose={() => setIsTransferOpen(false)} originProductId={currentCard!.id} actualProductNumber={currentCard?.productNumber || ''} />
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

export default Account