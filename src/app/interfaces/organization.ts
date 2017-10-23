interface Contact {
    phone: string;
    email: string;
    person: string;
}

export interface Organization {
    id: number; 
    orgId: string;
    name: string;
    phone: string;
    email: string;
    person: string;
    address: string;
    contact: Contact;
    password: string;
    billing: string;
    description: string;
}
