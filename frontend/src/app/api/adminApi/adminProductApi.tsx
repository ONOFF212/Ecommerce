

interface details{
    name:string;
    price:number;
    stock:number;
    description:string;
    img_url:File | null;
    category:string;
}

export async function getAdminProduct(){
    const token = localStorage.getItem('Bearer');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/products`,{
        method:'GET',
        headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`,
        }
    })
    const data = response.json();
    console.log("admin Fetch Product:: ",data);
    if(!response.ok) {
        throw new Error("Failed to Fetch Products");
    }
    return data;
    
};
    // headers:{
    //     "Content-Type": "multipart/form-data",
    //     //token
    // },
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/products`,{
        method:'POST',
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body:formData,
    })

    if(!response.ok){
        alert("Failed to create Product");
    }
    const responseData = response.json();
    return responseData;
};

export async function adminFetchProductById(id:number){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/products/${id}`,{
        method:"GET",
        headers:{
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`,
        },
    });
    if(!response.ok){
        alert('Failed to Fetch Product by Id');
    }
    return response.json();
};

export async function adminUpdateProduct(id:number, data:details){
    const token = localStorage.getItem("Bearer");
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category", data.category);
    formData.append("description", data.description);

    // if (!data.img_url) {
    //     alert("Please select an image");
    //     return;
    // }
    if(data.img_url instanceof File){
        formData.append("img_url", data.img_url);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/products/${id}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
        },
        body:formData,
    });
        
    if(!response.ok){
        alert("Failed to create Product");
    }
    const responseData = response.json();
    return responseData;
};

export async function adminDeleteProduct(id:number){
    const token = localStorage.getItem("Bearer");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/products/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    if(!response.ok){
        alert("Failed to Delete Products");
    };
    const responseData = response.json();
    return responseData;
};