import { useState } from 'react';
import Card from '../components/Card'
import './styles/Account.css'
import { MinusCircle, PlusCircle, Send } from 'lucide-react';
import { cardsData } from '../assets/mockData/card';

function Account() {
  const [activeType, setActiveType] = useState<'SAVING' | 'CURRENT'>('SAVING');
  const currentCard = cardsData.find(c => c.type === activeType) || cardsData[0];

  const handleDeposit = () => console.log('Acción: Depositar');
  const handleWithdraw = () => console.log('Acción: Retirar');
  const handleTransfer = () => console.log('Acción: Transferir');

  return (
    <div className='account-container'>
      <Card 
        {...currentCard} 
        type={currentCard.type as 'SAVING' | 'CURRENT'}
        status={currentCard.status as 'ACTIVE' | 'INACTIVE' | 'CANCELLED'}
      />

      <div className='actions-wrapper'>
        <button className='btn-action deposit' onClick={handleDeposit}>
          <PlusCircle size={20} />
          <span>Depositar</span>
        </button>

        <button className='btn-action withdraw' onClick={handleWithdraw}>
          <MinusCircle size={20} />
          <span>Retirar</span>
        </button>

        <button className='btn-action transfer' onClick={handleTransfer}>
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
    </div>
  );
}

export default Account