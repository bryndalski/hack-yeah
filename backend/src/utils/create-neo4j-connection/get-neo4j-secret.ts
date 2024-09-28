import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { Neo4JData } from './neo4j-connection.types';

/**
 * Get the secrets from AWS Secrets Manager. The secret is a JSON object with the following structure:
 * {
 *  NEO4J_HOST: string;
 *  NEO4J_PORT: string;
 *  NEO4J_PASSWORD: string;
 *  NEO4J_USERNAME: string;
 *  }
 *  @param secretArn The ARN
 *  @returns The secret data
 *  @throws Error if the secret string is not found
 *
 */
export async function getSecrets(secretArn: string): Promise<Neo4JData> {
  const secretsManager = new SecretsManager();
  const data = await secretsManager.getSecretValue({ SecretId: secretArn });
  if (data.SecretString) {
    const secret = JSON.parse(data.SecretString);
    return {
      hostname: secret.NEO4J_HOST,
      port: secret.NEO4J_PORT,
      password: secret.NEO4J_PASSWORD,
      username: secret.NEO4J_USERNAME,
      scheme: secret.NEO4J_SCHEME,
    };
  }
  return {
    hostname: "",
    port: "",
    password: "",
    username: "",
    scheme: "",
  };
}