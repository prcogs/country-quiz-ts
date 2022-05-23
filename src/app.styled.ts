import styled from 'styled-components'

const Main = styled.div`
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background: rgba(96, 102, 208, 0.7);
`

const Card = styled.div`
   position: relative;
   max-width: 464px;
   height: 600px;
   width: 90%;
   background-color: #FFFF;
   padding: 68px 32px;
   border-radius: 24px;

   .title {
      position: absolute;
      top: -60px;
      left: 0;
      font-weight: bold;
      font-size: 36px;
      line-height: 54px;

      color: #FFFF;
   }
`

export const S = {
   Main,
   Card,
}
