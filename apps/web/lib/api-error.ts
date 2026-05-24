import { NextResponse } from 'next/server';

export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'UNPROCESSABLE_ENTITY'
  | 'INTERNAL_ERROR';

export type ApiErrorPayload = {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
};

const statusByCode: Record<ApiErrorCode, number> = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500
};

export function toApiErrorResponse(code: ApiErrorCode, message: string, details?: unknown) {
  const payload: ApiErrorPayload = {
    error: {
      code,
      message,
      ...(details !== undefined ? { details } : {})
    }
  };

  return NextResponse.json(payload, { status: statusByCode[code] });
}

export function unknownToApiError(error: unknown, fallbackMessage = 'Unexpected server error') {
  if (error instanceof Error) {
    return toApiErrorResponse('INTERNAL_ERROR', error.message || fallbackMessage);
  }

  return toApiErrorResponse('INTERNAL_ERROR', fallbackMessage, error);
}
