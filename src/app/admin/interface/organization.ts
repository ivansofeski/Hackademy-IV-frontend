interface Contact {
    phone: string;
    email: string;
    person: string;
}

export interface Organization {
    id: number; // Subject to change (Remove) - This is a property only get/set from the database!
    orgId: string;
    name: string;
    address: string;
    contact: Contact;
    password: string;
    billing: string;
    description: string;
}

// TESTING PURPOSE ONLY! USE AT YOUR OWN RISK!
export interface NewOrganization {
    id: number; // Subject to change (Remove) - This is a property only get/set from the database!
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
