import { useCallback, useMemo, useState } from 'react';

export interface FieldIssue {
  path: Array<string | number>;
  message: string;
}

export interface FieldSchema<T> {
  safeParse: (
    data: unknown,
  ) => { success: true; data: T } | { success: false; error: { issues: FieldIssue[] } };
}

function collectErrors<T extends object>(issues: FieldIssue[]) {
  const errors: Partial<Record<keyof T, string>> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key !== 'string' && typeof key !== 'number') continue;
    const field = key as keyof T;
    if (errors[field]) continue;
    errors[field] = issue.message;
  }
  return errors;
}

function isShallowEqual<T extends object>(left: T, right: T) {
  const leftKeys = Object.keys(left) as Array<keyof T>;
  const rightKeys = Object.keys(right) as Array<keyof T>;
  if (leftKeys.length !== rightKeys.length) return false;
  return leftKeys.every((key) => Object.is(left[key], right[key]));
}

export const useFields = <T extends object>(initialValues: T, schema?: FieldSchema<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const isDirty = useMemo(() => !isShallowEqual(values, initialValues), [initialValues, values]);

  const validate = useCallback(() => {
    if (!schema) {
      setErrors({});
      return { ok: true, values } as const;
    }

    const parsed = schema.safeParse(values);
    if (parsed.success) {
      setErrors({});
      return { ok: true, values: parsed.data } as const;
    }

    const nextErrors = collectErrors<T>(parsed.error.issues);
    setErrors(nextErrors);
    return { ok: false, errors: nextErrors } as const;
  }, [schema, values]);

  const submit = useCallback(
    (onValid: (values: T) => void | Promise<void>) => {
      const result = validate();
      if (!result.ok) return result;
      void onValid(result.values);
      return result;
    },
    [validate],
  );

  return { values, setField, setValues, reset, isDirty, errors, validate, submit } as const;
};
