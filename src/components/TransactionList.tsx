import TransactionItem from './TransactionItem';

function TransactionList({ transactions }: { transactions: any[] }) {
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
    </div>
  );
}

export default TransactionList;