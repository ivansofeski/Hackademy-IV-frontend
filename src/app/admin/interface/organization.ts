import { IContact } from './contact';

export interface IOrganization {
    id: number;
    orgId: string;
    name: string;
    address: string;
    contact: IContact;
    password: string;
    billing: string;
    description: string;
}
