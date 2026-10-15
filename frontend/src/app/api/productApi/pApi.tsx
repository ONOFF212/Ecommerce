
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async  function getProducts() {

    const response = await fetch(`${APIURL}/api/products`);

    if(!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = response.json();
    
    return data;
};

