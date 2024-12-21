"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const productIdFromUrl = urlParams.get("product-id");

    if (productIdFromUrl) {
      const product = PRODUCTS_DATA.find((p) => p.id === productIdFromUrl);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productIdFromUrl = urlParams.get("product-id");

      if (productIdFromUrl) {
        const product = PRODUCTS_DATA.find((p) => p.id === productIdFromUrl);
        setSelectedProduct(product || null);
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenModal = useCallback((product: Product) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("product-id", product.id); 
    window.history.pushState({}, "", `/products?${urlParams.toString()}`); 
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/products"); 
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
