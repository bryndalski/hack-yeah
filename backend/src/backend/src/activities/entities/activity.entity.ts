import { Record } from "neo4j-driver";

import { Neo4jUserType } from "../types/neo4j-user.type";

export class ActivityEntity {
  static get nodeName() {
    return "ActivityEntity";
  }

  static get properties() {
    return {
      latitude: "latitude",
      longitude: "longitude",
      name: "name",
      description: "description",
      activity: "activity",
      distance: "distance",
      duration: "duration",
      participantsNumber: "participantsNumber",
      scheduledAt: "scheduledAt",
    };
  }

  static fromNeo4jResponse = (
    input: Record,
    key: string = "this0"
  ): Neo4jUserType["properties"] => {
    return {
      latitude: input.get(key).properties.latitude,
      longitude: input.get(key).properties.longitude,
      name: input.get(key).properties.name,
      description: input.get(key).properties.description,
      activity: input.get(key).properties.activity,
      distance: input.get(key).properties.distance,
      duration: input.get(key).properties.duration,
      participantsNumber: input.get(key).properties.participantsNumber,
      scheduledAt: input.get(key).properties.scheduledAt,
    };
  };
}
