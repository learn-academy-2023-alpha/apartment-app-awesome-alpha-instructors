import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ApartmentEdit from "./pages/ApartmentEdit"
import ApartmentIndex from "./pages/ApartmentIndex"
import ApartmentNew from "./pages/ApartmentNew"
import ApartmentShow from "./pages/ApartmentShow"
import ProtectedIndex from "./pages/ProtectedIndex"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

const App = (props) => {
  const [apartments, setApartments] = useState([])

  useEffect(() => {
    readApartments()
  }, [])

  const readApartments = () => {
    fetch("/apartments")
    .then((response) => response.json())
    .then((payload) => setApartments(payload))
    .catch((error) => console.log(error))
  }

  const createApartment = (apartment) => {
    fetch("/apartments", {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then(() => readApartments())
    .catch((errors) => console.log(errors))
  }
  return (
    <>
      <BrowserRouter>
        <Header {...props}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apartmentindex" element={<ApartmentIndex apartments={apartments} />} />
          <Route path="/apartmentshow/:id" element={<ApartmentShow apartments={apartments} />} />
          <Route path="/apartmentnew" element={<ApartmentNew current_user={props.current_user} createApartment={createApartment} />} />
          <Route path="/apartmentedit" element={<ApartmentEdit />} />
          <Route path="/myapartments" element={<ProtectedIndex apartments={apartments} current_user={props.current_user} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App