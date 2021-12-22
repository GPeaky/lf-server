import { useState } from 'react';
import Validator from 'validator'

export const useEmail = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("");

    const changeEmail = (value:string) => {
        setEmail(value)
        Validator.isEmail(value) ? setError(false) : setError(true)
    }

    return [email, changeEmail, error]
}