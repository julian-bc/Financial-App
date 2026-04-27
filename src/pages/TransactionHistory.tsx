import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransactionItem from "../components/TransactionItem";
import useSession from "../auth/useSession";
import { useProduct } from "../auth/useProduct";
import { findPageByProductNumber } from "../api/transaction.api";
import type { TransactionResponse } from "../api/interfaces/transaction.interfaces";
import "./styles/TransactionHistory.css";
import { ChevronLeft } from "lucide-react";

function TransactionHistory() {
  const { user } = useSession();
  const { userProducts, currentProductNumber } = useProduct();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const currentPage = parseInt(searchParams.get("page") || "0");
  const pageSize = parseInt(searchParams.get("size") || "10");

  // Get first product's productNumber (for now, default to first account)
  const currentProduct = userProducts.find(p => p.productNumber === currentProductNumber) || userProducts[0];

  useEffect(() => {
    if (!currentProduct || !currentProduct.productNumber) {
      setLoading(false);
      return;
    }

    const loadTransactions = async () => {
      setLoading(true);
      try {
        const response = await findPageByProductNumber(
          currentProduct.productNumber,
          currentPage,
          pageSize
        );
        setTransactions(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (error) {
        console.error("Error loading transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [currentProduct, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: pageSize.toString() });
  };

  const handlePageSizeChange = (newSize: number) => {
    setSearchParams({ page: "0", size: newSize.toString() });
  };

  return (
    <>
      <Navbar name={user.firstName} />

      <div className="transaction-history-container">
        <div className="transaction-history-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            <ChevronLeft size={20} />
            <span>Volver</span>
          </button>
          <h1>Historial de Transacciones</h1>
          <div style={{ width: "80px" }} /> {/* Spacer for alignment */}
        </div>

        {loading ? (
          <p className="loading-text">Cargando transacciones...</p>
        ) : transactions.length === 0 ? (
          <p className="empty-text">
            No hay transacciones disponibles para este período.
          </p>
        ) : (
          <>
            <div className="transactions-list">
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
              <div className="pagination-info">
                <span>
                  Página {currentPage + 1} de {totalPages} • Total:{" "}
                  {totalElements} transacciones
                </span>
              </div>

              <div className="pagination-controls">
                <button
                  className="btn-pagination"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  Anterior
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`page-number ${
                        idx === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(idx)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="btn-pagination"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                >
                  Siguiente
                </button>
              </div>

              <div className="page-size-selector">
                <label htmlFor="pageSize">Elementos por página:</label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={(e) =>
                    handlePageSizeChange(parseInt(e.target.value))
                  }
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TransactionHistory;
