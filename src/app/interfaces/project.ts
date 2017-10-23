export interface Project {
    id: number;
    projectId: string;
    projectName: string;
    projectManager: string;
    fromDate: string;
    toDate: string;
    address: string;
    lat?: number;
    lng?: number;
    location: {
        lat: number;
        lng: number;
    };
    neededFunding: number;
    raisedFunding: number;
    description: string;
    mainImage: string;
    images: string[];
    organizationName: string;
    organizationId: number;
    open: string; 
}