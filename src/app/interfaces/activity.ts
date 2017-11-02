export interface Activity {
    eventId?: number;
    projectId: number;
    eventTitle: string;
    eventDescription: string;
    eventDate: Date | number;
    eventImage: string;
}
