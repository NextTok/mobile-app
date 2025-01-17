import * as SecureStore from 'expo-secure-store';
import * as React from 'react';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

export function useStorageState<Value extends string>(key: string, initialValue?: Value): UseStateHook<Value> {
  // Public
  const [state, setState] = useAsyncState<Value>(initialValue ? [true, initialValue] : undefined);

  // Get
  React.useEffect(() => {
    SecureStore.getItemAsync(key).then(value => {
      setState(value as Value | null);
    });
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value: Value | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
