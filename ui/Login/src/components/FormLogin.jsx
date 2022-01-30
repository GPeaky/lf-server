import * as yup from 'yup'
import Input from './Input'
import logo from '../img/logo.svg'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const FormLogin = () => {
    const FormStyled = styled.form`
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        width: 100%;
        .imageForm {
          width: 150px;
        }
        
        .textRegister {
          color: #9a9a9e;
          font-size: 14px;
          width: 225px;
          margin-bottom: 20px;
        }

        .submitLogin {
          background: #f39327;
          width: 225px;
          padding: 15px;
          border: none;
          border-radius: 10px;
          box-shadow: 0px 0px 4px #f39327;
          margin-top: 10px;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 300ms all;
        }

        .submitLogin:hover {
          background: #995e1c;
        }

        .textProblem {
          color: white;
          font-size: 15px;
          display: block;
          margin-top: 5px;
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
                If you do not have an account <a style={{ color: "#f39327" }}>register</a>.
            </p>
            <Input
                type="email"
                placeholder="example@email.com"
                register={{ ...register("email") }}
                label='Email'
            />
            <Input
                type="password"
                placeholder="Password"
                register={{ ...register("password") }}
                label='Password'
            />
            <br/>
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