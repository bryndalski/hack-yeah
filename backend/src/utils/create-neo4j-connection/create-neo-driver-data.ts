/* eslint-disable @typescript-eslint/require-await */
import type { Driver } from 'neo4j-driver';
import neo4j from 'neo4j-driver';
import { Neo4JData } from './neo4j-connection.types';

/**
 * Create a neo4j driver
 * @param username -
 * @param password
 * @param hostname
 * @param port
 * @param scheme
 */
export const createDriverByNeoData = ({
  username,
  password,
  hostname,
  port,
  scheme,
}: Neo4JData): Driver => {
  const url = `${scheme}://${hostname}:${port}`;

  return neo4j.driver(
    url,
    neo4j.auth.basic(username, password),
    process.env.ENV_NAME === "aws"
      ? {
          maxConnectionPoolSize: 5,
        }
      : {}
  );
};