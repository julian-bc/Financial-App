import { useState } from 'react';
import Card from '../components/Card'
import './styles/Account.css'
import { MinusCircle, PlusCircle, Send } from 'lucide-react';
import { cardsData } from '../assets/mockData/card';
import Navbar from '../components/Navbar';
import TransactionList from '../components/TransactionList';
import { mockTransactions } from '../assets/mockData/transactions';
import DepositModal from '../components/modals/DepositModal';
import WithdrawModal from '../components/modals/WithdrawModal';
import TransferModal from '../components/modals/TransferModal';

function Account() {
  const [activeType, setActiveType] = useState<'SAVING' | 'CURRENT'>('SAVING');
  const currentCard = cardsData.find(c => c.type === activeType) || cardsData[0];

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <>
      <Navbar name={currentCard.cardHolder}/>

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
        <DepositModal onClose={() => setIsDepositOpen(false)} />
      )}
      
      {isWithdrawOpen && (
        <WithdrawModal onClose={() => setIsWithdrawOpen(false)} />
      )}
      
      {isTransferOpen && (
        <TransferModal onClose={() => setIsTransferOpen(false)} />
      )}
    </>

  );
}

export default Account