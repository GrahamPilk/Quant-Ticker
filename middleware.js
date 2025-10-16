import { updateSession } from './app/Services/supabase/middleware'

export async function middleware(request) {
  // Skip middleware for auth-related pages
  if (request.nextUrl.pathname.startsWith('/login') || 
      request.nextUrl.pathname.startsWith('/signup') || 
      request.nextUrl.pathname.startsWith('/auth/')) {
    return
  }
  
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login, signup, auth pages (handled above)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|login|signup|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
