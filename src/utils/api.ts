export const getErrorCode = (error: unknown) =>
  error instanceof Error && 'code' in error && typeof error.code === 'number'
    ? error.code
    : 500
