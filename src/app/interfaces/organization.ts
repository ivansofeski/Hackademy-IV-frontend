interface Contact {
    phone: string;
    email: string;
    person: string;
}

export interface Organization {
    organizationID?: string;
    organizationName?: string;
    organizationAddress?: string;
    contactPersonName?: string;
    contactPersonEmail?: string;
    accountNumber?: string;
    billingInformation: string;
    description: string;
    
    id: number; 
    orgId: string;
    name: string;
    address: string;
    contact: Contact;
    password: string;
    billing: string;
}
