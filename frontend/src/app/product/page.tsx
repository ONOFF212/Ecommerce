
'use client'
import { useState } from "react";
import "./productStyle.css";
import SearchNavBar from "@/components/navbars/productPageNavbar";
import SideBar from "@/components/sidebars/productPageSidebar";
import { productsHooks } from "@/hooks/productsHooks";
import Pagination from "@/components/commonComponents/pagination";
import SortProducts from "@/components/otherComponents/sortProducts";
import { ProductsList } from "@/components/commonComponents/productList";

export default function ProductPage(){
  const [filters, setFilters] = useState({ search:"", category:"", minPrice:0, maxPrice:0, sort:"", page:1, limit:5 });

  const {products, totalPages} = productsHooks(filters);
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

      <div className="footer font-mono">
        <p>
          © {new Date().getFullYear()} Shopify. All rights reserved.
        </p>
      </div>
    </div>
    </>
  );
};