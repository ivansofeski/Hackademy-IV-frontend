interface Contact {
    phone: string;
    email: string;
    person: string;
}

export interface Organization {
    id: number;
    orgId: string;
    name: string;
    address: string;
    contact: Contact;
    password: string;
    billing: string;
    description: string;
}


// Depricated
export interface IOrganization {
    id: number;
    orgId: string;
    name: string;
    address: string;
    contact: Contact;
    password: string;
    billing: string;
    description: string;
}
