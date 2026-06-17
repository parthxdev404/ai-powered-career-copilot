export interface User {
    name : string,
    email : string,
    password : string
}

export interface RegisterData {
    name : string,
    email : string,
    password : string,
    confirmPassword : string
}

export interface LoginData {
    email : string,
    password : string
}

export interface FormError {
    email? : string,
    password? : string,
    confirmpassword? : string
}