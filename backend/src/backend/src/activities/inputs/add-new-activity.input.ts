import { ActivitiesTypeEnum } from "../enums/activities-type.enum";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddNewActivityInput {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsEnum(ActivitiesTypeEnum)
  activity: ActivitiesTypeEnum;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  @IsOptional()
  participantsNumber: number;

  @IsString()
  @MaxLength(255)
  activityName: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @IsDateString()
  scheduledAt: Date;
}
