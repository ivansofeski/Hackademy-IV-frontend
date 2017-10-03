export interface Project {
    id: number;
    projectName: string;
    toDate: string;
    fromDate: string;
    location: { lat: number, lng: number};
    address: string;            
    neededFunding: number;
    raisedFunding: number;
    description: string;
    mainImage: string;
    projectManager: string;
    projectId: string;
    organizationName: string;
}