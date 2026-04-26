import { useState, useContext, useEffect, type ReactNode } from "react";
import { ProductContext, type ProductContextType } from "./ProductContext";
import { SessionContext } from "./SessionContext";
import type { ProductResponse, ProductRequest } from "../api/interfaces/product.interfaces";
import {
  retrieveProducts,
  retrieveProductById,
  retrieveProductsByClientId,
  saveProduct,
  activeProduct,
  disableProduct,
  cancelProduct,
  exemptGMF,
  disableExemptGMF,
  deleteProduct,
} from "../api/product.api";

type Props = {
  children: ReactNode;
};

function ProductProvider({ children }: Props) {
  const { user } = useContext(SessionContext);
  
  const [userProducts, setUserProductsState] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modifiedProducts, setModifiedProducts] = useState<boolean>(false);

  // Refrescar productos cuando modifiedProducts cambia a true
  useEffect(() => {
    if (modifiedProducts && user) {
        console.log("Productos modificados, refrescando lista...");
      const refreshProducts = async () => {
        try {
          setLoading(true);
            const clientId = user.id;
          if (clientId) {
            const products = await retrieveProductsByClientId(clientId);
            setUserProductsState(products);
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
          setModifiedProducts(false);
        }
      };
      refreshProducts();
    }
  }, [modifiedProducts, user]);

  // Cargar productos cuando el usuario se loguea
  useEffect(() => {
    if (user && userProducts.length === 0) {
      const loadInitialProducts = async () => {
        try {
          setLoading(true);
          const clientId = user.id;
          if (clientId) {
            const products = await retrieveProductsByClientId(clientId);
            setUserProductsState(products);
          }
        } catch (err) {
          setError((err as Error).message);
          console.error("Error cargando productos iniciales:", err);
        } finally {
          setLoading(false);
        }
      };
      loadInitialProducts();
    }
    
    // Limpiar productos cuando se desloguea
    if (!user) {
      setUserProductsState([]);
      setError(null);
    }
  }, [user]);

  const setUserProducts = (products: ProductResponse[]) => {
    setUserProductsState(products);
    setError(null);
  };

  const addUserProduct = (product: ProductResponse) => {
    setUserProductsState((prevProducts) => [...prevProducts, product]);
  };

  const removeUserProduct = (productId: number) => {
    setUserProductsState((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const updateUserProduct = (product: ProductResponse) => {
    setUserProductsState((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? product : p))
    );
  };

  const clearUserProducts = () => {
    setUserProductsState([]);
    setError(null);
  };

  // Métodos para llamar a los endpoints de la API
  const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
      setLoading(true);
      const products = await retrieveProducts();
      return products;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error obteniendo productos:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await retrieveProductById(id);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error obteniendo producto por ID:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (body: ProductRequest): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await saveProduct(body);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error creando producto:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const activateProduct = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await activeProduct(id);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error activando producto:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const disableProductHandler = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await disableProduct(id);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error desactivando producto:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelProductHandler = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await cancelProduct(id);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error cancelando producto:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const exemptGMFHandler = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await exemptGMF(id);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error exentando GMF:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const disableExemptGMFHandler = async (id: number): Promise<ProductResponse | null> => {
    try {
      setLoading(true);
      const product = await disableExemptGMF(id);
      setModifiedProducts(true);
      return product;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error deshabilitando exención GMF:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await deleteProduct(id);
      setModifiedProducts(true);
      return result;
    } catch (err) {
      setError((err as Error).message);
      console.error("Error eliminando producto:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: ProductContextType = {
    userProducts,
    loading,
    error,
    setUserProducts,
    addUserProduct,
    removeUserProduct,
    updateUserProduct,
    clearUserProducts,
    setLoading,
    setError,
    setModifiedProducts,
    // Métodos de API
    getAllProducts,
    getProductById,
    createProduct,
    activateProduct,
    disableProductHandler,
    cancelProductHandler,
    exemptGMFHandler,
    disableExemptGMFHandler,
    deleteProductHandler,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductProvider;
