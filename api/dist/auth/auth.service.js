"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
let AuthService = class AuthService {
    accounts = new Map();
    constructor() {
        this.addAccount('Famille Dupont', 'Demo', process.env.DEMO_EMAIL ?? 'demo@mamiemedoc.app', process.env.DEMO_PASSWORD ?? 'Mamie2026!');
    }
    signup(body) {
        const familyName = this.requireText(body, 'familyName', 'Family name');
        const name = this.requireText(body, 'name', 'Your name');
        const email = this.requireText(body, 'email', 'Email');
        const password = this.requireText(body, 'password', 'Password', false);
        if (!EMAIL_PATTERN.test(email)) {
            throw new common_1.BadRequestException('Please enter a valid email address');
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw new common_1.BadRequestException(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
        }
        if (this.accounts.has(normalizeEmail(email))) {
            throw new common_1.ConflictException('An account with this email already exists');
        }
        return toPublic(this.addAccount(familyName, name, email, password));
    }
    signin(body) {
        const email = readText(body, 'email');
        const password = readText(body, 'password', false);
        const account = this.accounts.get(normalizeEmail(email));
        if (!account || !passwordMatches(password, account)) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
        return { ...toPublic(account), token: (0, node_crypto_1.randomBytes)(32).toString('hex') };
    }
    addAccount(familyName, name, email, password) {
        const salt = (0, node_crypto_1.randomBytes)(16).toString('hex');
        const account = {
            familyName,
            name,
            email: normalizeEmail(email),
            salt,
            hash: hashPassword(password, salt),
        };
        this.accounts.set(account.email, account);
        return account;
    }
    requireText(body, field, label, trim = true) {
        const value = readText(body, field, trim);
        if (!value) {
            throw new common_1.BadRequestException(`${label} is required`);
        }
        return value;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
function readText(body, field, trim = true) {
    if (typeof body !== 'object' || body === null)
        return '';
    const value = body[field];
    if (typeof value !== 'string')
        return '';
    return trim ? value.trim() : value;
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function hashPassword(password, salt) {
    return (0, node_crypto_1.scryptSync)(password, salt, 64).toString('hex');
}
function passwordMatches(password, account) {
    const attempt = Buffer.from(hashPassword(password, account.salt), 'hex');
    return (0, node_crypto_1.timingSafeEqual)(attempt, Buffer.from(account.hash, 'hex'));
}
function toPublic({ familyName, name, email }) {
    return { familyName, name, email };
}
//# sourceMappingURL=auth.service.js.map