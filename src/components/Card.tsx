import { ShieldCheck, ShieldOff, Wifi } from 'lucide-react';
import './styles/Card.css';
import { useState } from 'react';
import HubShowNumbers from "./HubShowNumbers"

interface CardProps {
  cardNumber: string;
  cardHolder: string;
  balance: number;
  type: 'CURRENT' | 'SAVING';
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
  isExemptGMF: boolean;
  currency?: string;
}

const statusConfig: Record<'ACTIVE' | 'INACTIVE' | 'CANCELLED', { label: string; className: string }> = {
  ACTIVE: { label: 'ACTIVA', className: 'status-active' },
  INACTIVE: { label: 'INACTIVA', className: 'status-inactive' },
  CANCELLED: { label: 'CANCELADA', className: 'status-cancelled' },
};

const formatCardNumber = (number: string) => {
  return "**** **** **** " + number.slice(-4);
}

const formatCardAmount = (amount: string) => {
  return amount.replaceAll(amount, "*".repeat(amount.length));
}

export default function Card({ 
  cardNumber, 
  cardHolder, 
  balance, 
  type, 
  status, 
  isExemptGMF, 
  currency = 'COP'
}: CardProps) {
  const cardTypeClass = type === 'SAVING' ? 'card-saving' : 'card-current';
  const [showAmount, setShowAmount] = useState<boolean>(false);
  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
  const st = statusConfig[status];

  return (
    <div className={`bank-card ${cardTypeClass}`}>
      
      {/* Capa Decorativa de fondo */}
      <div className='card-overlay'>
        <div className='circle circle-1'></div>
        <div className='circle circle-2'></div>
      </div>

      <div className='card-content'>
        
        {/* Superior: Saldo y Estado */}
        <div className='card-row-top'>
          <div className='account-info'>
            <span className='account-type-label'>
              CUENTA DE {type === 'SAVING' ? 'AHORROS' : 'CORRIENTE'}
            </span>
            
            <p className='account-balance'>
              {currency} ${balance.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className='status-container'>
            <span className={`status-badge ${st.className}`}>{st.label}</span>
            <Wifi size={20} className='icon-wifi' />
          </div>
        </div>

        {/* Media: Chip y GMF */}
        <div className='card-row-middle'>
          <div className='security-chip'></div>
          <div className='gmf-tag'>
            {isExemptGMF ? (
              <><ShieldCheck size={14} /> <span>Exento GMF</span></>
            ) : (
              <><ShieldOff size={14} /> <span>No exento GMF</span></>
            )}
          </div>
        </div>

        {/* Inferior: Número y Titular */}
        <div className='card-row-bottom'>
          <p className='display-card-number'>
            <HubShowNumbers
              number={cardNumber}
              state={showCardNumber}
              changeState={setShowCardNumber}
              formatNumber={formatCardNumber}
            />
          </p>
          
          <div className='footer-flex'>
            <div className='holder-details'>
              <span className='label-tiny'>TITULAR</span>
              <p className='holder-name-text'>{cardHolder.toUpperCase()}</p>
            </div>
            
            <div className='brand-circles'>
              <div className='brand-c1'></div>
              <div className='brand-c2'></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}