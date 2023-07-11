import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = sessionStorage.getItem(key);

            if (value) {
                return JSON.parse(value);
            }
            else {
                sessionStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }

        }
        catch (err) {
            return defaultValue;
        }
    });

    const setValue = newValue => {
        try {
            sessionStorage.setItem(key, JSON.stringify(newValue));
        } catch (err) {
            console.log(err)
        }

        setStoredValue(newValue)
    }

    return [storedValue, setValue]

}

export default useLocalStorage;