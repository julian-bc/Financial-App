import { useNavigate } from "react-router-dom";
import TransactionItem from './TransactionItem';
import './styles/Transactions.css';

function TransactionList({ 
  transactions, 
  hasMorePages = false 
}: { 
  transactions: any[], 
  hasMorePages?: boolean 
}) {
  const navigate = useNavigate();

  return (
    <div className='transactions-container'>
      <h3 className='transactions-title'>Movimientos Recientes</h3>
      <div className='transactions-list'>
        {transactions.length > 0 ? (
          transactions.map(t => <TransactionItem key={t.id} transaction={t} />)
        ) : (
          <p className='empty-msg'>No hay movimientos registrados.</p>
        )}
      </div>

      {hasMorePages && transactions.length > 0 && (
        <button 
          className="btn-view-history"
          onClick={() => navigate("/transaction-history")}
        >
          Ver Historial Completo
        </button>
      )}
    </div>
  );
}

export default TransactionList;