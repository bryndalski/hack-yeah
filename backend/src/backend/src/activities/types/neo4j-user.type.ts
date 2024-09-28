export type Neo4jUserType = {
  properties: Neo4jUserTypeProperties;
};

export type Neo4jUserTypeProperties = {
  latitude: string;
  longitude: string;
  name: string;
  description: string;
  activity: string;
  distance: string;
  duration: string;
  participantsNumber: string;
  scheduledAt: string;
};
