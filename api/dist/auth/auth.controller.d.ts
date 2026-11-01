import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: unknown): import("./auth.service").PublicAccount;
    signin(body: unknown): import("./auth.service").PublicAccount & {
        token: string;
    };
}
