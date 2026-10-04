
const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async  function getProducts() {

    const response = await fetch(`${APIURL}/products`);

    if(!response.ok) {
        console.log("Http Error! Status: ", response.status);
    }
    console.log("Data Fetch Successfull");

    return response.json();
};