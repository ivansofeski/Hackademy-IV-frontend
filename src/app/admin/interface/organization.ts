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

export interface NewOrganization {
    id: number;
    orgId: string;
    name: string;
    address: string;
    contactName: string;
    contactPhone: number;
    contactEmail: string;
    bankAccount: string;
    city: string;
    zipCode: string;
    billing: string;
    description: string;
}
