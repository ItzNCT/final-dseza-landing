// Centralized configuration for environment-based endpoints

export const DRUPAL_BASE_URL: string = import.meta.env.VITE_DRUPAL_BASE_URL || (import.meta.env.DEV ? '' : '');

export const GRAPHQL_ENDPOINT: string = import.meta.env.VITE_GRAPHQL_ENDPOINT || (import.meta.env.DEV ? '/graphql' : '');

// Used by auth redirects and any non-proxied REST endpoints
export const API_TARGET: string = import.meta.env.VITE_API_TARGET || '';


