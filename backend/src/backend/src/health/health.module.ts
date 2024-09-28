import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, ConfigModule,HttpModule],

})

export class HealthModule {
}
