export interface Donor {
    id: number;
    userName: string;
    userSlogan: string;
    userImage: string;
    wallet: {
        total: number;
        donated: number;
    };
    savedProject: number[];
}
