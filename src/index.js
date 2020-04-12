import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
