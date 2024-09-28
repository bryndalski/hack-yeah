import { User } from "@backend/user-module/entities/user";
import { Match, Node, Param, Pattern } from "@neo4j/cypher-builder";

import { TelemetryTools } from "@lambda-utils/index";

import { TelemetryTools } from "@lambda-utils/index";

import { CreateCognitoUserEvent } from "../types";

export async function createNeo4jUser(
  telemetry: TelemetryTools,
  neo4jDriver: any,
  event: CreateCognitoUserEvent
) {
  const userNode = new Node();

  const createNodePattern = new Pattern(userNode);

  const setNodeProperties = new Match(createNodePattern).set(
    [userNode.property(User.properties.id), new Param(event.userName)],
    [
      userNode.property(User.properties.email),
      new Param(event.request.userAttributes.email),
    ],
    [
      userNode.property(User.properties.fullname),
      new Param(`${event.request.userAttributes.fullname}`),
    ],
    [
      userNode.property(User.properties.gender),
      new Param(event.request.userAttributes.gender),
    ],
    [
      userNode.property(User.properties.birthdate),
      new Param(event.request.userAttributes.birthdate),
    ]
  );

  const { cypher, params } = setNodeProperties.build();

  telemetry.logger.debug("Creating user in neo4j", { cypher, params });
  const createUserResponse = await neo4jDriver.session().run(cypher, params);

  telemetry.tracer.addResponseAsMetadata(
    "create-user-response",
    createUserResponse.toString()
  );
}
