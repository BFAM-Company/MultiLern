import { sign } from 'jsonwebtoken';

class RefreshToken {
    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }

    id: number;
    userId: number;
    userAgent: string;
    ipAdress: string;

    sign(): string {
        return sign({ ...this }, process.env.REFRESH_SECRET, {
            expiresIn: '7d',
        });
    }
}

export default RefreshToken;
