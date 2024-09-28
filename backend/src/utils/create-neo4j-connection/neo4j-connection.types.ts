/**
 * Use it to connect to Neo4J
 * @interface Neo4JData
 * @packageDocumentation
 * @module ecps-packages
 */
export type Neo4JData = {
  /**
   * The hostname of the Neo4J instance. Without prefix, just ip/domain
   */
  hostname: string;
  /**
   * The port of the Neo4J instance
   */
  password: string;
  /**
   * The port of the Neo4J instance
   */
  port: string;
  /**
   * The scheme of the Neo4J instance
   */
  scheme: string;

  /**
   * The username of the Neo4J instance
   */
  username: string;
};
