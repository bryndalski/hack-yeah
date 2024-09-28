import { ApiProperty } from "@nestjs/swagger";

export class ActivityDto {
  @ApiProperty({ type: Number })
  latitude: number;

  @ApiProperty({ type: Number })
  longitude: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  activity: string;

  @ApiProperty({ type: Number })
  distance: number;

  @ApiProperty({ type: Number })
  duration: number;

  @ApiProperty({ type: Number, required: false })
  participantsNumber?: number;

  @ApiProperty({ type: String })
  scheduledAt: string;

  constructor() {
  }
}