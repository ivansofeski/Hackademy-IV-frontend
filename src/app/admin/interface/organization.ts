import { IContact } from './contact';

export interface IOrganization {
    id: string;
    orgId: string;
    name: string;
    address: string;
    contact: IContact;
    password: string;
    billing: string;
    description: string;
}
