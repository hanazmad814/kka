import { NextResponse } from 'next/server';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'INTERNAL_ERROR'
  | 'METHOD_NOT_ALLOWED'
  | 'TOO_MANY_REQUESTS'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN';

export type ApiErrorPayload = {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
    traceId?: string;
    timestamp: string;
  };
};

const statusByCode: Record<ApiErrorCode, number> = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403
};

export type ApiErrorOptions = {
  details?: unknown;
  traceId?: string;
};

export function toApiErrorResponse(code: ApiErrorCode, message: string, options: ApiErrorOptions = {}) {
  const payload: ApiErrorPayload = {
    error: {
      code,
      message,
      timestamp: new Date().toISOString(),
      ...(options.details !== undefined ? { details: options.details } : {}),
      ...(options.traceId ? { traceId: options.traceId } : {})
    }
  };

  return NextResponse.json(payload, { status: statusByCode[code] });
}

export function unknownToApiError(error: unknown, fallbackMessage = 'Unexpected server error') {
  if (error instanceof Error) {
    return toApiErrorResponse('INTERNAL_ERROR', error.message || fallbackMessage);
  }

  return toApiErrorResponse('INTERNAL_ERROR', fallbackMessage, {
    details: error
  });
}
