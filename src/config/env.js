// ⚙️ Validación de variables de entorno
export const PORT = process.env.PORT;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_URL = process.env.POSTGRES_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX);
export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS);
export const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;
export const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;
