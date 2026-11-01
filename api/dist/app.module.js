"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const care_circle_module_1 = require("./care-circle/care-circle.module");
const doses_module_1 = require("./doses/doses.module");
const events_module_1 = require("./events/events.module");
const medications_module_1 = require("./medications/medications.module");
const patient_module_1 = require("./patient/patient.module");
const prisma_module_1 = require("./prisma/prisma.module");
const prescriptions_module_1 = require("./prescriptions/prescriptions.module");
const profiles_module_1 = require("./profiles/profiles.module");
const push_module_1 = require("./push/push.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            events_module_1.EventsModule,
            auth_module_1.AuthModule,
            patient_module_1.PatientModule,
            profiles_module_1.ProfilesModule,
            prescriptions_module_1.PrescriptionsModule,
            care_circle_module_1.CareCircleModule,
            medications_module_1.MedicationsModule,
            doses_module_1.DosesModule,
            push_module_1.PushModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map