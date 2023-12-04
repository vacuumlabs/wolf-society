import { POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE } from '@/database'

export const getErrorCode = (error: unknown) =>
  error instanceof Error && 'code' in error && typeof error.code === 'number'
    ? error.code
    : 500

export const isKeyAlreadyExistError = (error: unknown) =>
  error instanceof Error &&
  'code' in error &&
  error.code === POSTGRES_KEY_ALREADY_EXISTS_ERROR_CODE
