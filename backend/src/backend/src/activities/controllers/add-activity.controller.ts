import { Body, Controller, Post } from "@nestjs/common";
import { ControllerUrlPrefix } from "../common/controller-url-prefix";
import { CreateActivityService } from "../services/create-activity.service";
import { AddNewActivityInput } from "../inputs";


@Controller(ControllerUrlPrefix)
export class AddActivityController {

  constructor(
    private readonly createActivityService: CreateActivityService,
  ) {
  }

  @Post("new-activity")
  createActivity(
    @Body() input: AddNewActivityInput,
  ) {
    return this.createActivityService.createActivity(input);
  }

}