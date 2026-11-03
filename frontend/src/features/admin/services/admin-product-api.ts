
import { ADMIN_API_PRODUCTS , GET_PRODUCT_API} from "../constant/constant";
const api = ADMIN_API_PRODUCTS;
const publicApi = GET_PRODUCT_API;

interface details{
    name:string;
    price:number;
    stock:number;
    description:string;
    img_url:File | null;
    category:string;
}

export async function getProduct(){
    const token = localStorage.getItem('Bearer');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${publicApi}`,{
        method:'GET',
        headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`,
        }
    })
    const data = await response.json();
    console.log("admin Fetch Product:: ",data);
    if(!response.ok) {
        throw new Error("Failed to Fetch Products");
    }
    return data;
    
};

export async function adminCreateProduct(data:details){
    const token = localStorage.getItem("Bearer");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);
    formData.append("description", data.description);

    if (!data.img_url) {
        alert("Please select an image");
        return;
    }
    formData.append("img_url", data.img_url);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${api}`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body:formData,
    })

    if(!response.ok){
        alert("Failed to create Product");
    }
    const responseData = await response.json();
    return responseData;
};

export async function fetchProductById(id:number){
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${publicApi}/${id}`);
    if(!response.ok){
        alert('Failed to Fetch Product by Id');
    }

    return await response.json();
};

export async function adminUpdateProduct(id:number, data:details){
    const token = localStorage.getItem("Bearer");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);
    formData.append("description", data.description);

    if(data.img_url instanceof File){
        formData.append("img_url", data.img_url);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${api}/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body:formData,
    });
        
    if(!response.ok){
        alert("Failed to create Product");
    }
    const responseData = await response.json();
    return responseData;
};

export async function adminDeleteProduct(id:number){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${api}/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok){
        alert("Failed to Delete Products");
    };
    const responseData = await response.json();
    return responseData;
};