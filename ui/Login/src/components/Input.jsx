import styled from '@emotion/styled'

export default function Input ({type, placeholder, register, image}) {
    const InputStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .inputLogin {
      background: #202b8b;
      border-radius: 20px;
      border: none;
      padding: 10px;
      padding-left: ${image ? '40px' : '10px'};
      width: 90%;
      height: 30px;
      margin-top: 10px;
      font-size: 13px;
      color: #3f6cff;
    }
    .inputLogin::placeholder {
      color: #3f6cff;
    }
    .inputImage {
      position: absolute;
      width: 16px;
      margin-right: 231px;
      margin-top: 17px;
    }
  `

  return (
    <InputStyled>
      {/* {image && <div className='inputImage'><img src={image} alt='Logo of input'/></div>} */}
      <input type={type} className="inputLogin" {...register} placeholder={placeholder} />
    </InputStyled>
   )
}
