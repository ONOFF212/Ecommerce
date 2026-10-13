import { loginInput, signupInput,updateInput } from "@/utils/formTypeCheck";

async function getErrorMessage(response:Response):Promise<string>{
    try{
        const body = await response.json();
        return body.message || "Request Failed";
    }catch{
        return "Request Failed";
    }
}

function saveToken(response:Response) {
    const token = response.headers.get("Authorization");
    if(token){
        localStorage.setItem("Bearer", token);
    }
}

export async function signupUser(data:signupInput) {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    })

    if(!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    saveToken(response);
    return await response.json();
} 

export async function loginUser(data:loginInput) {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    })

    if(!response.ok) {
        throw new Error (await getErrorMessage(response));
    }
    saveToken(response);

    const responseData = await response.json();
    if(responseData){
        localStorage.setItem("Current user", JSON.stringify(responseData.user));
    }
    return responseData;
}

export async function updateUser(data:updateInput){
    const token = localStorage.getItem("Bearer");
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });
    if(!response.ok) {
        throw new Error(await getErrorMessage(response));
    } 
    return await response.json(); 
};