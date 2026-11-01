type Account = {
    familyName: string;
    name: string;
    email: string;
    salt: string;
    hash: string;
};
export type PublicAccount = Pick<Account, 'familyName' | 'name' | 'email'>;
export declare class AuthService {
    private readonly accounts;
    constructor();
    signup(body: unknown): PublicAccount;
    signin(body: unknown): PublicAccount & {
        token: string;
    };
    private addAccount;
    private requireText;
}
export {};
