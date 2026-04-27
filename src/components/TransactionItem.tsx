import { ArrowDownLeft, ArrowUpRight, Repeat } from 'lucide-react';
import './styles/Transactions.css'

// Mapeo de tipos para estilos e iconos
const typeConfig = {
  CONSIGNMENT: { label: 'Consignación', color: 'text-success', icon: <ArrowDownLeft size={16} /> },
  WITHDRAWAL: { label: 'Retiro', color: 'text-danger', icon: <ArrowUpRight size={16} /> },
  TRANSFERENCE: { label: 'Transferencia', color: 'text-info', icon: <Repeat size={16} /> },
};

function TransactionItem({ transaction }: any) {
  const config = typeConfig[transaction.transactionType as keyof typeof typeConfig];

  const [day, month, year] = transaction.transactionDate.split(' ')[0].split('.');
  const transactionDate = new Date(Number(year), Number(month) - 1, Number(day));

  // Formateador de fecha: "14 Abril 2026"
  const dateFormatted = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(transactionDate);

  // Lógica de signo y color
  const isNegative = transaction.transactionType !== 'CONSIGNMENT';
  const amountClass = isNegative ? 'amount-negative' : 'amount-positive';
  const displayAmount = `${isNegative ? '-' : '+'} $${transaction.amount.toLocaleString('es-CO')}`;

  return (
    <div className="transaction-item">
      <div className={`icon-container ${transaction.transactionType.toLowerCase()}`}>
        {config.icon}
      </div>
      
      <div className="transaction-info">
        <div className="info-main">
          <span className="type-label">{config.label}</span>
          <span className={amountClass}>{displayAmount}</span>
        </div>
        
        <div className="info-details">
          <span className="date-text">{dateFormatted}</span>
          <span className="product-path">
            {transaction.transactionType === 'TRANSFERENCE' && 'Transferencia entre cuentas'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem