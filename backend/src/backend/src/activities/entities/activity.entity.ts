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
}
