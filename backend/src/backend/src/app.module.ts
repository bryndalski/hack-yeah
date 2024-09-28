import { Module } from "@nestjs/common";
import { UserModuleModule } from "./user-module/user-module.module";
import { HealthModule } from "./health/health.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [UserModuleModule, HealthModule,ConfigModule.forRoot()],
    controllers: [],
    providers: [],
})
export class AppModule {}
