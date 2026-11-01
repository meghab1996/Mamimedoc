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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(patient) {
        const members = await this.prisma.familyMember.findMany({
            where: { patientId: patient.id },
            orderBy: [{ callOrder: 'asc' }, { id: 'asc' }],
        });
        return [patientProfile(patient), ...members.map(memberProfile)];
    }
    async addFamilyMember(patient, body) {
        const firstName = requireText(body, 'firstName', 'First name');
        const relation = requireText(body, 'relation', 'Relation');
        const phone = requireText(body, 'phone', 'Phone');
        const existing = await this.list(patient);
        if (existing.some((profile) => profile.key === profileKey(firstName))) {
            throw new common_1.BadRequestException(`A profile called ${firstName} already exists`);
        }
        const last = await this.prisma.familyMember.aggregate({
            where: { patientId: patient.id },
            _max: { callOrder: true },
        });
        const member = await this.prisma.familyMember.create({
            data: {
                patientId: patient.id,
                firstName,
                relation,
                phone,
                callOrder: (last._max.callOrder ?? 0) + 1,
            },
        });
        return memberProfile(member);
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
function profileKey(firstName) {
    return firstName.trim().toLowerCase();
}
function patientProfile(patient) {
    return {
        key: profileKey(patient.firstName),
        type: 'patient',
        firstName: patient.firstName,
        role: 'Mamie',
        avatarUrl: patient.avatarUrl,
    };
}
function memberProfile(member) {
    return {
        key: profileKey(member.firstName),
        type: 'family',
        firstName: member.firstName,
        role: member.relation,
        avatarUrl: member.avatarUrl,
    };
}
function requireText(body, field, label) {
    const value = typeof body === 'object' && body !== null
        ? body[field]
        : undefined;
    const text = typeof value === 'string' ? value.trim() : '';
    if (!text) {
        throw new common_1.BadRequestException(`${label} is required`);
    }
    return text;
}
//# sourceMappingURL=profiles.service.js.map