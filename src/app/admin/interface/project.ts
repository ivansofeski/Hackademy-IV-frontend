export interface Project {
    id: number;
    projectName: string;
    toDate: string;
    fromDate: string;
    address: string;
    neededFunding: number;
    raisedFunding: number;
    description: string;
    mainImage: string;
    projectManager: string;
    projectId: string;
    organizationName: string;
    organizationId: number;
}

export interface NewProject {
    prId: string;
    title: string;
    manager: string;
    startDate: string;
    dueDate: string;
    fundsGoal: number;
    fundsRaised: number;
    description: string;
    address: string;
    mainImage: string;
    status: boolean | string; // Subject to change: String -> Boolean
    closedDate: Date | string;
    orgId: number;
    organizationName: string;
    
}

