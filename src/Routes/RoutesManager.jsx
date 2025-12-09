import Home from '@/pages/Home'
import Register from '@/pages/Register'
import Signin from '@/pages/Signin'
import React from 'react'
import { Route, Routes  } from 'react-router'

const RoutesManager = () => {
  return (
    <Routes>
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Signin/>} />
       <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default RoutesManager