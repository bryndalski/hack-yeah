import { Injectable, Logger } from "@nestjs/common";
import { AddNewActivityInput } from "../inputs";
import { Create, Node, Param, Pattern } from "@neo4j/cypher-builder";
import { ActivityEntity } from "../entities/activity.entity";
import { Neo4jService } from "nest-neo4j";

@Injectable()
export class CreateActivityService {
  private readonly logger: Logger;


  constructor(
    private readonly neo4jService: Neo4jService,
  ) {
    this.logger = new Logger(CreateActivityService.name);
  }


  async createActivity(
    input: AddNewActivityInput,
  ) {

    const activityNode = new Node();

    const nodeWithProperties = this._createActivityNode(input, activityNode);

    const { cypher, params } = nodeWithProperties.return(activityNode).build();

    this.neo4jService.beginTransaction();
    const response = await this.neo4jService.write(cypher, params);

    this.logger.debug({ response });

  }

  private _createActivityNode(input: AddNewActivityInput, activityNode: Node) {
    return new Create(new Pattern(activityNode, {
      labels: ActivityEntity.nodeName,
    })).set(
      [activityNode.property(ActivityEntity.properties.name), new Param(input.activityName)],
      [activityNode.property(ActivityEntity.properties.description), new Param(input.description)],
      [activityNode.property(ActivityEntity.properties.activity), new Param(input.activity)],
      [activityNode.property(ActivityEntity.properties.distance), new Param(input.distance)],
      [activityNode.property(ActivityEntity.properties.duration), new Param(input.duration)],
      [activityNode.property(ActivityEntity.properties.participantsNumber), new Param(input.participantsNumber)],
      [activityNode.property(ActivityEntity.properties.scheduledAt), new Param(input.scheduledAt)],
      [activityNode.property(ActivityEntity.properties.latitude), new Param(input.latitude)],
      [activityNode.property(ActivityEntity.properties.longitude), new Param(input.longitude)],
    );
  }


}