import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  
  if (!context) {
    throw new Error("useProduct debe ser usado dentro de ProductProvider");
  }
  
  return context;
};
