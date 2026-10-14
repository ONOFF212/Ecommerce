import { loginInput, signupInput,updateInput } from "@/utils/formTypeCheck";
import { useAuth } from "@/contexts/authContext/authContext";


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
    
    const responseData = await response.json();

    if(responseData){
        localStorage.setItem("Current user", JSON.stringify(responseData.user));
    }
    return responseData;
} 

export async function loginUser(data:loginInput) {

    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data),
    })

    const responseData = await response.json();
    console.log(responseData);

        console.log(response);

        if (!response.ok) {
            alert(JSON.stringify(responseData.message) || "Login failed");
            alert("Email or Password doesn't Match");
            return ;
        }

        if (responseData && responseData.user) {
            localStorage.setItem("Current user", JSON.stringify(responseData.user));
            
            const token = response.headers.get("Authorization");
            if(token){
                localStorage.setItem("Bearer", token);
            }
        }

        return responseData;
}

export async function updateUser(data:updateInput){
    
    const token = localStorage.getItem("Bearer");
    localStorage.removeItem("Current user");
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        method:'PUT',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(data),
    });

    const responseData = await response.json();

        if (!response.ok) {
            alert(responseData.message || "Failed to Update");
            alert("Failed to Update Details");
            return ;
        }
        console.log(response);
        if (responseData && responseData.user) {
            localStorage.setItem("Current user", JSON.stringify(responseData.user));
            
            const token = response.headers.get("Authorization");
            if(token){
                localStorage.setItem("Bearer", token);
            }
        }

        return responseData;
};