
'use client'
import { useState } from "react";
import "./product-style.css";
import SearchNavBar from "@/features/products/filters/ProductPageNavbar";
import SideBar from "@/features/products/filters/ProductPageSidebar";
import Pagination from "@/components/layout/Pagination";
import SortProducts from "@/features/products/filters/SortProducts";
import { ProductsList } from "@/features/products/components/ProductList";

import  ProductsHooks  from "@/features/products/hooks/useProducts";

export default function ProductPage(){
  const [filters, setFilters] = useState({ search:"", category:"", minPrice:0, maxPrice:0, sort:"", page:1, limit:8 });

  const {products, totalPages} = ProductsHooks(filters);
  return (
    <>
    <div className="product-layout">

      <div className="nav-bar">
        <SearchNavBar onFilterChange={(newFilters) => 
                                        setFilters((prev) => ({
                                          ...prev,
                                          ...newFilters
                                        }))
                                      } 
        />
      </div>

      <div className="side-bar">
        <SideBar onFilterChange={(newFilters) =>
                                    setFilters((prev) =>({
                                      ...prev,
                                      ...newFilters
                                    }))
                                }
      />
      </div>

      <div className="product-view">
        <div>
          <SortProducts onSortChange={(newFilters) => 
                                          setFilters((prev) => ({
                                            ...prev,
                                            ...newFilters
                                          }))
                                          } 
                                        />
        </div>
        <ProductsList products={products} />
        {/* <Pagination page={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => 
                      setFilters((prev) => ({
                        ...prev,
                        page:newPage,
                      }))
                    }
        /> */}
      </div>

      <div className="footer font-mono">
        {/* <p>
          © {new Date().getFullYear()} Shopify. All rights reserved.
        </p> */}
        <Pagination page={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => 
                      setFilters((prev) => ({
                        ...prev,
                        page:newPage,
                        
                      }))
                    }
        />
      </div>
    </div>
    </>
  );
};