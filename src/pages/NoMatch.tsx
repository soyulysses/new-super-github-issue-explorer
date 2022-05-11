import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import BasePage from "../components/Common/BasePage";

const NoMatch = () => {
  return (
    <Fragment>
      <BasePage>
        <div style={{gap: '32px',height: 'calc(100vh - 64px - 32px)', width: '100%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <h1 style={{margin: 0}}>Page not found</h1>
          <Link to='/' style={{background: 'rgba(255,255,255,.25)', color: 'white', textDecoration: 'none', padding: '6px 12px', borderRadius: '8px'}} >BACK TO HOME</Link>
        </div>
      </BasePage>
    </Fragment>
  )
}

export default React.memo(NoMatch)