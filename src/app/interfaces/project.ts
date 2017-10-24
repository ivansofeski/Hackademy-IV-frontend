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

    mainImage: string;  // using imageOrVideo
    images: string[]; // this must be added by backend.
    address: string;  // Does not exist on backend, is this needed by frontend?
    location: {       // To be removed.
        lat: number;
        lng: number;
    };
    neededFunding: number;  //using amountToBeRaised
    organizationName: string;  //to be removed
    
}