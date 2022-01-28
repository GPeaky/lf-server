import styled from '@emotion/styled'
import FormLogin from './FormLogin'

const Login = () => {
    const LoginStyled = styled.div`
        position: absolute;
        top: 25%;
        bottom: 10%;
        left: 2%;
        right: 0;
        z-index: 3;
        /*.divImage {
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
        }*/
        
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
            height: 520px;
            width: 300px;
            border-radius: 20px;
            overflow: hidden;
            z-index: 2;
            background: transparent;
        }
    `
  return (
    <LoginStyled>
      <div className="contentLogin">
        <FormLogin />
      </div>
    </LoginStyled>
  )
}

export default Login;