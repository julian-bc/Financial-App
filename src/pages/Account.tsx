import { useEffect, useState } from 'react';
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
import { retrieveProductsByClientId } from '../api/product.api';

function Account() {
  const { user } = useSession();

  const [activeType, setActiveType] = useState<'SAVING' | 'CURRENT'>('SAVING');
  const [cardsData, setCardsData] = useState<any[]>([]);

  async function getCards (currentUserId: number) {
    try {
      const result = await retrieveProductsByClientId(currentUserId);
      const data = result.data; 
      const updatedResult = data.map((card: any) => ({
        ...card,
        cardNumber: card.productNumber,
        cardHolder: user.data.firstName,
      }));
      console.log(updatedResult)
      setCardsData(updatedResult);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCards(user.data.id);
  }, []);

  // trae las tarjetas de la api, las 2 AHORRO Y CORRIENTE utilizando algun dato del usuario del localstorage guardado como user, para acceder a los datos usar user.data
  const currentCard = cardsData.find(c => c.type === activeType) || cardsData[0];

  if (cardsData.length === 0) {
    return <p>Cargando cuentas...</p>; 
  }

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

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
            className={`btn-switch ${activeType === 'SAVING' ? 'active-saving' : ''}`}
            onClick={() => setActiveType('SAVING')}
          >
            Cuenta Ahorros
          </button>
          <button 
            className={`btn-switch ${activeType === 'CURRENT' ? 'active-current' : ''}`}
            onClick={() => setActiveType('CURRENT')}
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