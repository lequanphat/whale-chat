/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export default function useLocalStorage(key: string, defaultValue: string) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue === null ? defaultValue : JSON.parse(storedValue);
    });

    useEffect(() => {
        const listener = (e: any) => {
            if (e.storageArea === localStorage && e.key === key) {
                setValue(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', listener);

        return () => {
            window.removeEventListener('storage', listener);
        };
    }, [key, defaultValue]);

    const setValueInLocalStorage = (newValue: any) => {
        setValue((currentValue: any) => {
            const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

            localStorage.setItem(key, JSON.stringify(result));

            return result;
        });
    };

    return [value, setValueInLocalStorage];
}
