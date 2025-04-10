import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { validateAuth } from "./app/(lib)/validateAuth";

export const middleware = async (req: NextRequest) => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const path = req.nextUrl.pathname;


  if (!access_token && path !== "/login" && path !== "/register") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (access_token && (path === "/login" || path === "/register")) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: [
      '/((?!static|favicon.ico|manifest.json|_next).*)',
  ],
};