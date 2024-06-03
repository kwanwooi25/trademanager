export const PATHS = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const;

export const AUTH_ROUTES: string[] = [PATHS.SIGN_IN, PATHS.SIGN_UP];
