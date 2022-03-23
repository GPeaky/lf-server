import type { NextPage } from 'next'
import styled from '@emotion/styled'
import Image from 'next/image'
import bottomLogin from '../public/img/bottomLogin.jpg'
import AdvertsLogin from '../components/login/AdvertsLogin'
import FormLogin from '../components/login/FormLogin'

const Login: NextPage = () => {
  const LoginStyled = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .divImage {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      z-index: 0;
      * {
        width: 100%;
        height: 100%; 
      }
    }
    .contentLogin {
      display: flex;
      flex-flow: row wrap;
      top: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      left: 0;
      right: 0;
      background: white;
      height: 375px;
      width: 500px;
      border-radius: 20px;
      overflow: hidden;
      background: #090916;
    }
  `
  return (
    <LoginStyled>
      <div className="divImage">
        <Image src={bottomLogin} alt='Bottom of login' />
      </div>
      <div className="contentLogin">
        <AdvertsLogin />
        <FormLogin />
      </div>
    </LoginStyled>
  )
}

export default Login