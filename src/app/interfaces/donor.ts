export interface Donor {
    id: number;
    userName: string;
    userSlogan: string;
    userImage: string;
    total?: number;
    donated?: number;
    wallet: {
        total: number;
        donated: number;
    };
    savedProject: number[];
}
