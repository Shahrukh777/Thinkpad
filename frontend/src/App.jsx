import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/createPage'
import NoteDetailsPage from './pages/noteDetailsPage'

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App