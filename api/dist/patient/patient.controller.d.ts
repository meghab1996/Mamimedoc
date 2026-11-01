import type { Patient } from '@prisma/client';
export declare class PatientController {
    getCurrent(patient: Patient): {
        id: number;
        firstName: string;
        lastName: string;
        birthDate: Date;
        avatarUrl: string | null;
    };
}
