import { Module } from "@nestjs/common";
import { AddActivityController } from "./controllers";
import { CreateActivityService } from "./services";

@Module({
  controllers: [AddActivityController],
  providers: [
    CreateActivityService,
  ],
})
export class ActivitiesModule {
}
