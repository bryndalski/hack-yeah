import { DynamicModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Neo4jModule } from "nest-neo4j";

export const providers: DynamicModule[] = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  Neo4jModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      scheme: configService.getOrThrow<string>("NEO4J_SCHEME"),
      host: configService.getOrThrow<string>("NEO4J_HOST"),
      port: configService.getOrThrow<number>("NEO4J_PORT"),
      username: configService.getOrThrow<string>("NEO4J_USERNAME"),
      password: configService.getOrThrow<string>("NEO4J_PASSWORD"),
    }),
  }),
];
