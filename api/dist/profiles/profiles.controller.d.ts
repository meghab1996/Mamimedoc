import type { Patient } from '@prisma/client';
import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    list(patient: Patient): Promise<import("./profiles.service").Profile[]>;
    addFamilyMember(patient: Patient, body: unknown): Promise<import("./profiles.service").Profile>;
}
