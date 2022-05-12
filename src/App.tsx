import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Search from "./pages/Search"
import Issue from "./pages/Issue"
import NoMatch from "./pages/NoMatch"
import Main from "./pages/Main"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="search/:userId" element={<Search />} />
        <Route path="search/:userId/:repoId" element={<Search />} />
        <Route path="search/:userId/:repoId/:page" element={<Search />} />
        <Route path="issue/:userId/:repoId/:issueId" element={<Issue />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
