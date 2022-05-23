import styled from 'styled-components'

import { color } from 'style/color'


const StyledResult = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 46px;
`

const Button = styled.button`
   width: fit-content;

   padding: 18px 62px;
   border-radius: 12px;
   font-weight: 600;
   font-size: 18px;
   line-height: 27px;
   border: 2px solid ${color['primary-400']};
   color: ${color['primary-400']};
`

const Title = styled.h2`
   font-weight: 700;
   font-size: 48px;
   line-height: 72px;
   color: ${color['primary-400']};
`

const Para = styled.p`
   font-weight: 400;
   font-size: 18px;
   line-height: 27px;
   text-align: center;

   span {
      color: ${color.success};
      font-size: 24px;
   }
`
export const S = {
   StyledResult,
   Button,
   Title,
   Para,
}
