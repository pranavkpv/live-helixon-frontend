import Cookies from "js-cookie";


export function getAccessToken(): string | undefined {
  return Cookies.get("accessToken");
}

/**
 * ✅ Remove access token (logout)
 */
export async function removeAccessToken() {
  Cookies.remove("accessToken");
}

/**
 * Decode JWT payload WITHOUT verifying signature
 * (Backend already verified the token)
 */
export async function decodeJwtPayload(
  token: string
) {
  try {
    const base64Url = token.split(".")[1];

    const json = Buffer
      .from(base64Url, "base64url")
      .toString("utf8");

    return JSON.parse(json);

  } catch {
    return {};
  }
}