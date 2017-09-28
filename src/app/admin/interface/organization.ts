import { Contact } from './contact';

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
