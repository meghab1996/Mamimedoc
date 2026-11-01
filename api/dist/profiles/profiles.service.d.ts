import type { Patient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export type Profile = {
    key: string;
    type: 'patient' | 'family';
    firstName: string;
    role: string;
    avatarUrl: string | null;
};
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(patient: Patient): Promise<Profile[]>;
    addFamilyMember(patient: Patient, body: unknown): Promise<Profile>;
}
