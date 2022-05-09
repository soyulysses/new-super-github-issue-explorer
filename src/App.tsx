import React, {Fragment} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Search from "./pages/Search";
import Issue from "./pages/Issue";
import NoMatch from "./pages/NoMatch";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Search />} />
          <Route path="issue/:userId/:repoId/:issueId" element={<Issue />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App
