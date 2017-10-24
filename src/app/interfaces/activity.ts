export interface Activity {
    activityId?: number;
    projectId: string;
    activityTitle: string;
    activityDescription: string;
    activityDate: Date | number;
    activityImage: string;
}
