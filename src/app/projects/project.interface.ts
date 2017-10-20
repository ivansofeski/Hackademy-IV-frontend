export interface Project {
    id: number; // Subject to change (Remove) - This is a property only get/set from the database!
    projectId: string;
    projectName: string;
    projectManager: string;
    fromDate: string;
    toDate: string;
    address: string;
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
    open: string; // Subject to change (remove/keep)!
}
