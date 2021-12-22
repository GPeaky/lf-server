import { useEmail } from '../hooks/useEmail'
import { useState } from "react";
import { ButtonGroup, Button, TextField, Stack } from "@mui/material";
import ErrorList from './Errorlist';

const Login = () => {
    const [email, changeEmail, error] = useEmail();
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("")
    const [msgType, setType] = useState("")

    const onClick = () => {
        if (!error && email && password.length >= 6) {
            setType('sucess')
            setLoginError('All correct')
        } else {
            if (!email || !password ) {
                setType('error')
                setLoginError('Tienes que poner correo y contraseña')
            }
            if (password.length < 6) {
                setType('error')
                setLoginError('La contraseña tiene que tener al menos 6 carácteres')
            }
        }
    }

    return (

        <div className="page">

            <form className="loginForm">

                <Stack component="form" spacing={2} autoComplete="off" >
                    <h2 className="tittle">Login</h2>
                    <TextField
                        id="filled-hidden-label-small"
                        label={"Email"}
                        onChange={(e) => changeEmail(e.target.value)}
                        value={email}
                        size='small'
                        error={error}
                    />
                    <TextField
                        id="filled-hidden-label-small"
                        label={"Password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        size='small'
                        type='password'
                    />
                </Stack>

                <ErrorList text={loginError} type={msgType}></ErrorList>

                <ButtonGroup variant="outlined">
                    <Button variant="contained" color="primary" onClick={onClick} disabled={error}>
                        Login
                    </Button>
                    <Button variant="contained" color="secondary">
                        Register
                    </Button>
                </ButtonGroup>

            </form>

        </div>
        
    )

}

export default Login;