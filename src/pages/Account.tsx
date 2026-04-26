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
import useSession from '../auth/useSession';
import { useProduct } from '../auth/useProduct';

function Account() {
  const { user } = useSession();
  const { userProducts } = useProduct();

  const [activeType, setActiveType] = useState<'AHORROS' | 'CORRIENTE'>('AHORROS');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  // trae las tarjetas de la api, las 2 AHORRO Y CORRIENTE utilizando algun dato del usuario del localstorage guardado como user, para acceder a los datos usar user.data
  const currentCard = userProducts.find(p => p.productType === activeType) || userProducts[0];

  if (userProducts.length === 0) {
    return <p>Cargando cuentas...</p>; 
  }

  return (
    <>
      <Navbar name={user.data.firstName}/>

      <div className='account-container'>
        <Card 
          {...currentCard}
          type={currentCard.type as 'SAVING' | 'CURRENT'}
          status={currentCard.status as 'ACTIVE' | 'INACTIVE' | 'CANCELLED'}
        />

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

        <TransactionList transactions={mockTransactions}/>
      </div>

      {isDepositOpen && (
        <DepositModal onClose={() => setIsDepositOpen(false)} originProductId={currentCard.id} />
      )}
      
      {isWithdrawOpen && (
        <WithdrawModal onClose={() => setIsWithdrawOpen(false)} originProductId={currentCard.id} />
      )}
      
      {isTransferOpen && (
        <TransferModal onClose={() => setIsTransferOpen(false)} originProductId={currentCard.id} />
      )}
    </>

  );
}

export default Account