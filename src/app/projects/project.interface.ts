export interface Project {
    id: number;
    projectName: string;
    toDate: string;
    fromDate: string;
    location: {
        lat: number;
        lng: number;
    };
    events:[{
        eventId: number;
        eventTitle: string;
        eventDescription:string;
        eventDate: string;
        eventImage: string;
    }]
    address: string;            
    neededFunding: number;
    raisedFunding: number;
    description: string;
    mainImage: string;
    projectManager: string;
    projectId: string;
    organizationName: string;
    organizationId: number;
    openProject: boolean;
}