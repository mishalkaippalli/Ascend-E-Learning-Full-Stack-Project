let accessToken: string | null = null

export function setAccessToken(token: string | null) {                                // Keeps the short-lived access token in memory so non-React code can access it.
  accessToken = token
}

export function getAccessToken() {                                         // Allows Axios and other non-React code to read the current access token.
  return accessToken
}