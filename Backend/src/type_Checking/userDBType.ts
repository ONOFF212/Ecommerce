

export interface userSignup{
    name:string,
    email:string, 
    hashed_password:string,
    roleId:number,
}

export interface userLogin{
    email:string,
    password:string,
}


export interface userUpdate{
    name:string,
    email:string,
}

