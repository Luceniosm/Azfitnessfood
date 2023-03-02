import { UserModel } from './user.model';

export class AuthModel {
    accessToken: string;
    authenticated: boolean;
    created: Date;
    expiration: Date;
    message: string;
    refreshToken: string;
    user: UserModel;
}
