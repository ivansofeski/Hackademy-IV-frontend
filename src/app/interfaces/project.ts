export interface Project {
    id: number;
    projectId: string;
    projectName: string;
    fromDate: string;
    toDate: string;
    longitude?: number;
    latitude?: number;
    amountToBeRaised?: number;
    raisedFunding: number;
    description: string;
    imageOrvideo?:string;
    projectManager: string;    
    recurringProject?: boolean;
    recurringProjectPublishingDate?: Date|null;
    mainImage: string;
    images: string[];
    organizationId: number;
    open: string; 

    address: string;
    location: {
        lat: number;
        lng: number;
    };
    neededFunding: number;
    organizationName: string;
    
}