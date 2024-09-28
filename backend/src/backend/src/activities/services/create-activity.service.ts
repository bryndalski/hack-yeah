import { Injectable } from "@nestjs/common";
import { AddNewActivityInput } from "../inputs";

@Injectable()
export class CreateActivityService {
  constructor() {
  }


  createActivity(
    input: AddNewActivityInput,
  ) {

  }

}