import type { Driver } from 'neo4j-driver';
import { getSecrets } from '@lambda-utils/create-neo4j-connection/get-neo4j-secret';
import { createDriverByNeoData } from '@lambda-utils/create-neo4j-connection/create-neo-driver-data';

/**
 * Create a neo4j driver using the secret arn
 * @param neo4jSecretArn
 * @returns Driver - neo4j driver
 *
 */
export async function createNeoDriver(
  neo4jSecretArn?: string
): Promise<Driver> {
  if (!neo4jSecretArn) throw new Error("Neo4j secret arn is required");

  const connectionData = await getSecrets(neo4jSecretArn);

  if (!connectionData) throw new Error("Failed to get connection data");

  return createDriverByNeoData(connectionData);
}