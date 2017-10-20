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

// TESTING PURPOSE ONLY! USE AT YOUR OWN RISK!
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
    orgId: number;
    organizationName: string;
    status: boolean | string; // Subject to change: String -> Boolean
    closedDate: Date | string;
}

