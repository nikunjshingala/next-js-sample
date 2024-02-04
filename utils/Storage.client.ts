import isEmpty from 'lodash-es/isEmpty';
import { useCallback, useEffect, useState } from 'react';
import { StorageKeys } from './keys';

type SetItemParams = {
  [key in StorageKeys]: any;
};

export function useStorage() {
  const [windowObj, setWindowObj] = useState<any>({});

  useEffect(() => {
    if (isEmpty(windowObj)) {
      setWindowObj(window);
    }
  }, [windowObj]);

  const getItem = useCallback(
    (key: StorageKeys) => {
      try {
        const result =
          typeof window !== 'undefined'
            ? window.localStorage.getItem(key)
            : windowObj?.localStorage?.getItem(key);
        if (result) {
          try {
            return JSON.parse(result);
          } catch (e) {
            return result;
          }
        }
        return null;
      } catch (err) {
        return null;
      }
    },
    [windowObj?.localStorage]
  );

  const setItem = useCallback(
    (key: StorageKeys, value: unknown) => {
      try {
        return windowObj?.localStorage?.setItem(key, JSON.stringify(value));
      } catch (err) {
        return null;
      }
    },
    [windowObj?.localStorage]
  );

  const setItems = (items?: SetItemParams) => {
    if (!isEmpty(items)) {
      Object.entries(items)?.map(([key, value]) =>
        setItem(key as StorageKeys, value)
      );
    }
  };

  const getItems = useCallback(
    (keys: StorageKeys[]) => keys?.map((eachKey) => getItem(eachKey)),
    [getItem]
  );

  return { getItem, setItem, setItems, getItems, windowObj };
}
