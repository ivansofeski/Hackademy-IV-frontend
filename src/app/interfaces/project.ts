export interface Project {
    id?: number;
    projectNumber: string;
    projectName: string;
    address: string;
    fromDate: Date | number;
    toDate: Date | number;
    longitude: number;
    latitude: number;
    amountToBeRaised: number;
    raisedFunding: number;
    description: string;
    mainImage: string;
    images: string[];
    projectManager: string;
    recurringProject: boolean;
    nationalProject: boolean;
    recurringProjectPublishingDate?: Date|null;
    organizationId: number;
}
