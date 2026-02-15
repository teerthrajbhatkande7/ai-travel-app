import { auth } from "@/auth"

export default auth((req) => {
    // We can add custom logic here if needed, e.g. redirecting from /login if already logged in
    const isLoggedIn = !!req.auth;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup');

    if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/', req.nextUrl));
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
