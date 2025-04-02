import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Path, UseFormSetError } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Success<T> {
  data: T;
  error?: never;
}

interface Failure<E> {
  data?: never;
  error: E;
}

type SafeResult<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<SafeResult<T, E>> {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    return { error: error as E };
  }
}

export type ApiError = {
  code: string;
  message: string;
};

export type ValidationError = {
  success: false;
  error: {
    issues: {
      code: string;
      path: (string | number)[];
      message?: string;
    }[];
    name: string;
  };
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
}

export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    "error" in error &&
    "issues" in (error as any).error
  );
}

type ValidationIssue = {
  code: string;
  path: string[];
  message: string;
};

type ValidationErrorResponse = {
  success: false;
  error: {
    success: false;
    error: {
      issues: ValidationIssue[];
      name: string;
    };
  };
};

export function handleValidationError<T extends Record<string, any>>(
  data: any,
  setError: UseFormSetError<T>
): boolean {
  if (!data.success) {
    const errorResponse = data as ValidationErrorResponse;

    // Handle validation errors
    if (
      "error" in errorResponse.error &&
      "issues" in errorResponse.error.error
    ) {
      for (const issue of errorResponse.error.error.issues) {
        const field = issue.path[0] as Path<T>;
        setError(field, {
          type: issue.code,
          message: issue.message,
        });
      }
      return true;
    }
  }

  return false;
}
