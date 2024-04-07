export function configFromAccessToken(
  accessToken: string,
  headers: object = {}
) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  };
  return config;
}
