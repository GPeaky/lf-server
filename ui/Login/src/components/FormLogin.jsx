import * as yup from 'yup'
import Input from './Input'
import logo from '../img/logo.svg'
import styled from '@emotion/styled'
import arroba from '../img/arroba.png'
import candado from '../img/candado.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const FormLogin = () => {
    const FormStyled = styled.form`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        width: 300px;

        .imageForm {
            width: 32%;
            margin-top: 20px;
        }

        .textRegister, .textProblem {
            font-size: 12px;
            text-align: center;
            color: white;
        }

        .textProblem {
            color: #414894;
        }

        .submitLogin {
            background: #1f2d76;
            border-radius: 20px;
            border: none;
            padding: 5px;
            width: 90%;
            margin-top: 10px;
            font-size: 15px;
            color: #ccc;
            cursor: pointer;
            transition: 300ms all;
        }
        
        .submitLogin:hover {
            background: #2c41aa;
        }
    `

    const yupLogin = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(4).max(40)
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver( yupLogin ),
        reValidateMode: 'onSubmit'
    })

    const submitForm = ({ email, password }) => {
        window.mp.trigger('getInfo', email, password)
    }
    
    return (
        <FormStyled onSubmit={ handleSubmit(submitForm) }>
            <div className="imageForm">
                <img src={ logo } alt={"Logo"} />
            </div>
            <p className="textRegister">
                Hello! Enter your data to log in. <br />
                If you do not have an account <a style={{ color: "#414894" }}>register</a>.
            </p>
            <Input
                type="email"
                placeholder="example@email.com"
                image={ arroba }
                register={{ ...register("email") }}
            />
            <Input
                type="password"
                placeholder="Password"
                register={{ ...register("password") }}
                image={ candado }
            />
            <p className="textProblem">Do you problems to signin?</p>
            {
                (errors.email || errors.password) && (
                    <span className="msgError">Your email/password is incorrect</span>
                )
            }
            <button type="submit" className="submitLogin">
                Login
            </button>
        </FormStyled>
    )
}

export default FormLogin