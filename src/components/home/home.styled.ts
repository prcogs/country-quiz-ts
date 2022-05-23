import styled from 'styled-components'

import { color } from 'style/color'


const StyledHome = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   height: 100%;
`

const Select = styled.select`
   font-size: 18px;
`

const Container = styled.div`
   display: flex;
   justify-content: space-around;
   width: 100%;
`

const Title = styled.h2`
   font-weight: 700;
   font-size: 24px;
   line-height: 36px;
   color: ${color['primary-300']};
`

const Button = styled.button`
   width: 100%;
   font-weight: 700;
   font-size: 24px;
   line-height: 36px;
   align-self: flex-end;

   background-color: ${color['secondary-400']};
   border-radius: 8px;
   padding: 12px 0;
   color: ${color.blank};

   transition: background-color ease-in-out 200ms;

   &:hover {
      background-color: ${color['secondary-500']}
   }

   &.disable {
      cursor: not-allowed;
   }
   `

const Span = styled.span`
   color: ${color.error};
`
export const S = {
   StyledHome,
   Select,
   Container,
   Title,
   Button,
   Span,
}
