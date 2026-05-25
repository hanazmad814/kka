import { NextResponse } from 'next/server';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'TOO_MANY_REQUESTS'
  | 'INTERNAL_ERROR';

export type ApiErrorPayload = {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
    traceId?: string;
    timestamp: string;
    path?: string;
  };
};

const statusByCode: Record<ApiErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500
};

export type ApiErrorOptions = {
  details?: unknown;
  traceId?: string;
  path?: string;
};

export function toApiErrorResponse(code: ApiErrorCode, message: string, options: ApiErrorOptions = {}) {
  const payload: ApiErrorPayload = {
    error: {
      code,
      message,
      timestamp: new Date().toISOString(),
      ...(options.details !== undefined ? { details: options.details } : {}),
      ...(options.traceId ? { traceId: options.traceId } : {}),
      ...(options.path ? { path: options.path } : {})
    }
  };

  return NextResponse.json(payload, { status: statusByCode[code] });
}

export function unknownToApiError(error: unknown, fallbackMessage = 'Unexpected server error', options: Omit<ApiErrorOptions, 'details'> = {}) {
  if (error instanceof Error) {
    return toApiErrorResponse('INTERNAL_ERROR', error.message || fallbackMessage, options);
  }

  return toApiErrorResponse('INTERNAL_ERROR', fallbackMessage, {
    ...options,
    details: error
  });
}
