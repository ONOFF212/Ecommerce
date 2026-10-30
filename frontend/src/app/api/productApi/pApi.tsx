
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async  function getProducts() {
    
    const response = await fetch(`${APIURL}/api/products`);

    if(!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export async function getProductById(id:number) {
  
    const response = await fetch(`${APIURL}/api/auth/products/${id}`);
    if(!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

interface productsFilters{
    search?:string;
    category?:string;
    minPrice?:number;
    maxPrice?:number;
    sort?:string;
    page?:number;
    limit?:number;
}

export async  function searchProducts(filters:productsFilters = {}) {
    const token = localStorage.getItem("Bearer");
    const params = new URLSearchParams({
        search:filters.search ?? "",
        category:filters.category ?? "",
        minPrice:String((filters.minPrice === 0 || filters.minPrice === null || filters.minPrice === undefined)? "" : filters.minPrice),
        maxPrice:String((filters.maxPrice === 0 || filters.maxPrice === null || filters.maxPrice === undefined)? "" : filters.maxPrice),
        sort:filters.sort ?? "",
        page:String(filters.page ?? 1),
        limit:String(filters.limit ?? 10)
    });
    const response = await fetch(`${APIURL}/api/auth/products?${params.toString()}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
};

