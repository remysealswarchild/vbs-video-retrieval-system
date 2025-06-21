import React from 'react'
import { Header } from './components/Header/Header'
import { Home }   from './pages/Home'

// App: root component
export const App: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />
    <Home />
  </div>
)
