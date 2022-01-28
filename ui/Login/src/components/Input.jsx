// import { useState } from 'react'
import styled from '@emotion/styled'

export default function Input ({type, placeholder, register, value, label}) {
    const InputStyled = styled.div`
        width: 100%;
        display: flex;
        justify-content: center;

        .data {
          width: 225px;
          margin-top: 10px;
          label {
            color: white;
          }
        }

        .inputLogin {
            background: #2c2b32;
            border-radius: 5px;
            border: 2px solid #353539;
            width: 205px;
            padding-left: 10px;
            padding-right: 10px;
            height: 40px;
            outline: none;
            margin-top: 10px;
            font-size: 13px;
            color: white;
        }
        
        .inputImage {
            position: absolute;
            width: 16px;
            margin-right: 231px;
            margin-top: 17px;
        }

        img {
            width: 100%;
        }
    `

    return (
        <InputStyled>
            {/* {
                image && 
                <div className='inputImage'>
                    <img src={ image } alt='Logo of input'/>
                </div>
            } */}
            <div className="data">
              <label htmlFor={label}>{label}</label>
  
              <input 
                  type={ type } 
                  { ...register }
                  value={ value }
                  className="inputLogin" 
                  placeholder={ placeholder } 
              />
            </div>
        </InputStyled>
    )
}