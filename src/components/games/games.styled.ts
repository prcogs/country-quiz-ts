import styled from 'styled-components'

import { color } from 'style/color'


const Cards = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 26px;

   margin-bottom:24px;
`

const Card = styled.li`
   height: 56px;
   font-weight: 500;
   font-size: 18px;
   line-height: 27px;

   button {
      display: flex;
      align-items: center;
      gap: 46px;
      width: 100%;
      height:100%;
      position: relative;

      color: ${color['primary-200']};
      border-radius: 12px;
      border: 2px solid ${color['primary-200']};
      padding: 10px 18px;
      
      transition: background-color border ease-in-out 300ms;

      &.success {
         border: 2px solid transparent;
         color: ${color.blank};
         background-color: ${color.success};
         color: ${color.blank};

         &:hover {
            background-color: ${color.success};
         }
      }

      &.error {
         border: 2px solid transparent;
         color: ${color.blank};
         background-color: ${color.error};
         color: ${color.blank};

         &:hover {
            background-color: ${color.error};
         }
      }

      &.none {
         &:hover {
            background-color: ${color.blank};
            border: 2px solid ${color['primary-200']};
            color: ${color['primary-200']};
         }
      }

      &:disabled {
         cursor: not-allowed;
      }
   }

   button:hover {
      background-color: ${color['secondary-400']};
      border: 2px solid transparent;
      color: ${color.blank};
   }
`

const Question = styled.div`
   position: relative;

   font-weight: 700;
   font-size: 24px;
   line-height: 36px;
   color: ${color['primary-400']};
   margin-bottom: 32px;
`

const Img = styled.img`
   position: absolute;
   right: 0;
   top: -50px;
   width: 70px;
`

const StyledGame = styled.div``


const SpanImage = styled.span`
   position: absolute;
   width: 16px;
   height: 16px;
   top: 16px;
   right: 18px;
`

const StyledGames = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
   height: 100%;
   justify-content: space-between;
`

const Span = styled.span`
   position: absolute;
   top: -40px;
   left: 0;
   font-size: 20px;
`

const Button = styled.button`
   background-color: ${color['secondary-400']};
   border-radius: 8px;
   color: ${color.blank};
   padding: 16px 36px;
   width: min-content;
   align-self: flex-end;

   transition: background-color ease-in-out 200ms;

   &:hover {
      background-color: ${color['secondary-500']}
   }
`

export const S = {
   Cards,
   Card,
   Question,
   StyledGame,
   Img,
   SpanImage,

   StyledGames,
   Span,
   Button,
}
