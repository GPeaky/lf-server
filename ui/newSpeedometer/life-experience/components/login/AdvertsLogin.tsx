import type { NextPage } from 'next'
import gtaChrismas from '../../public/img/gtaChrismas.jpeg'
import Image from 'next/image'
import styled from '@emotion/styled'

const AdvertsLogin: NextPage = () => {
  const AdvertsStyled = styled.div`
    width: 200px;
    * {
      width: 100%;
    }
    .imageAdvert {
      margin: 0px;
    }
    .textAdvert {
      background: #423dff;
      color: white;
      font-size: 11px;
      padding: 5px;
      margin: 0px;
      margin-top: -5px;
      height: 26px;
      text-transform: uppercase;
    }
  `
    
  return (
    <AdvertsStyled>
      <div className="advert">
        <div className="imageAdvert">
          <Image src={gtaChrismas} alt='Image advert' />
        </div>
        <p className="textAdvert">
          La navidad llego a los santos
        </p>
      </div>
      <div className="advert">
        <div className="imageAdvert">
          <Image src={gtaChrismas} alt='Image advert' />
        </div>
        <p className="textAdvert">
          La navidad llego a los santos
        </p>
      </div>
      <div className="advert">
        <div className="imageAdvert">
          <Image src={gtaChrismas} alt='Image advert' />
        </div>
        <p className="textAdvert">
          La navidad llego a los santos
        </p>
      </div>
    </AdvertsStyled>
  )
}

export default AdvertsLogin