import Cookies from "js-cookie";

export function getAccessToken(): string | undefined {
  return Cookies.get("accessToken");
}

export function setAccessToken(token: string): void {
  Cookies.set("accessToken", token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
}

export function removeAccessToken(): void {
  Cookies.remove("accessToken");
}

export function decodeJwtPayload(token: string) {
  try {
    const base64Url = token.split(".")[1];

    if (!base64Url) return null;

    const json = Buffer
      .from(base64Url, "base64url")
      .toString("utf8");

    return JSON.parse(json);
  } catch {
    return null;
  }
}