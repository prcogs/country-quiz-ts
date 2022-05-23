import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'app'

import { ProvideGame } from 'utils/hooks/use-game'
import { ProvideRoutes } from 'utils/hooks/use-routes'

import 'style/base/reset.css'
import 'style/base/typographie.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <ProvideRoutes>
         <ProvideGame>
            <App />
         </ProvideGame>
      </ProvideRoutes>
   </React.StrictMode>,
)
