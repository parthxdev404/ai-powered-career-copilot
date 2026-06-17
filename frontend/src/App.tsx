import React from 'react'
import AppRoutes from './routes/AppRoutes'
import AuthInitializer from './components/AuthInitializer'

const App = () => {
  return (
    <>
    <AuthInitializer/>
    <AppRoutes/>
    </>
  )
}

export default App