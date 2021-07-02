export interface Contact{
    firstname: string,
    lastname : string,
    email: string,
    image: string,
    phone: any,
    [key:string] : any
}

export interface createContact{
    firstname: string,
    lastname: string,
    email: string,
    phone: any,
    [key:string] : any
}

export interface Listfile{
    name: string,
    size: number | null,
    type: string
}