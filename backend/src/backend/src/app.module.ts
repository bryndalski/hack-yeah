import { Module } from "@nestjs/common";
import { UserModuleModule } from "./user-module/user-module.module";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "@nestjs/config";
import { ActivitiesModule } from './activities/activities.module';

@Module({
    imports: [UserModuleModule, HealthModule,ConfigModule.forRoot(), ActivitiesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
