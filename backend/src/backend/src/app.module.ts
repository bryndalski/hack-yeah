import { Module } from "@nestjs/common";
import { UserModuleModule } from "./user-module/user-module.module";
import { HealthModule } from "./health/health.module";
import { ActivitiesModule } from "./activities/activities.module";
import { providers } from "./providers";

@Module({
  imports: [
    ...providers,
    UserModuleModule, HealthModule, ActivitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
