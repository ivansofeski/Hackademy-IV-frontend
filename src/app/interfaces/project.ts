export interface Project {
    id: number;
    projectId: string;
    projectName: string;
    fromDate: Date | number;
    toDate: Date | number;
    longitude?: number;
    latitude?: number;
    amountToBeRaised?: number;
    raisedFunding: number;
    description: string;
    imageOrvideo?:string;
    projectManager: string;    
    recurringProject?: boolean;
    recurringProjectPublishingDate?: Date|null;
    organizationId: number;
    open: string; 

    mainImage: string;
    images: string[];
address: string;
    location: {
        lat: number;
        lng: number;
    };
    neededFunding: number;
    organizationName: string;
    
}