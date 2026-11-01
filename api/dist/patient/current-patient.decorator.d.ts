import { PipeTransform } from '@nestjs/common';
import type { Patient } from '@prisma/client';
import type { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
export declare class CurrentPatientPipe implements PipeTransform<Request, Promise<Patient>> {
    private readonly prisma;
    constructor(prisma: PrismaService);
    transform(_request: Request): Promise<Patient>;
}
export declare const CurrentPatient: () => ParameterDecorator;
