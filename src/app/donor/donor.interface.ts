export interface Donor {
    id: number;
    userName: string;
    userSlogan: string;
    userImage: string;
    wallet: {
        total: number;
        donatet: number;
    };
    savedProject: number[];
}