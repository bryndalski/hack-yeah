import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "@nestjs/terminus";

@Controller("/")
export class HealthController {
  constructor(
    private health: HealthCheckService,
  ) {
  }

  @Get()
  healthCheck() {
    return this.health.check([]);
  }
}
