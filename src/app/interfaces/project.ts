export interface Project {
    id?: number;
    projectNumber?: string;
    projectName: string;
    address: string;
    fromDate: Date | number;
    toDate: Date | number;
    longitude?: number;
    latitude?: number;
    amountToBeRaised?: number;
    raisedFunding: number;
    description: string;
    mainImage:string;
    images: string[]; // this must be added by backend.    
    projectManager: string;    
    recurringProject?: boolean;
    nationalProject: boolean;
    recurringProjectPublishingDate?: Date|null;
    organizationId: number;

    open: string; //to be removed
    location: {       // To be removed.
        lat: number;
        lng: number;
    };
    neededFunding: number;  //using amountToBeRaised
    organizationName: string;  //to be removed
    
}