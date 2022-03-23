import type { NextPage } from 'next'
import logo from '../../public/img/logo.svg'
import Image from 'next/image'
import styled from '@emotion/styled'
import Input from '../Input'
import candado from '../../public/img/candado.png'
import arroba from '../../public/img/arroba.png'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const FormLogin: NextPage = () => {
  const FormStyled = styled.form`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 300px;
    .imageForm {
      width: 30%;
      margin-top: 20px;
    }
    .textRegister, .textProblem {
      font-size: 14px;
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
    resolver: yupResolver(yupLogin),
    reValidateMode: 'onSubmit'
  })
  const submitForm = (data: any) => {
    console.log(data)
  }
    
  return (
    <FormStyled onSubmit={handleSubmit(submitForm)}>
      <div className="imageForm">
        <Image src={logo} alt={'Logo'} />
      </div>
      <p className="textRegister">
        ¡Hola! Ingresa tus datos para conectarte. <br />
        Si no tienes cuenta <a style={{color: '#414894'}}>registrate</a>.
      </p>
      <Input type='email' placeholder='Correo Electrónico' image={arroba} register={{...register('email')}} />
      <Input type='password' placeholder='Contraseña' register={{...register('password')}} image={candado} />
      <p className='textProblem'>¿Problemas para ingresar?</p>
      {(errors.email || errors.password) && <span className='msgError'>La informacion no es válida</span>}
      <button type='submit' className='submitLogin'>Ingresar</button>
    </FormStyled>
  )
}

export default FormLogin