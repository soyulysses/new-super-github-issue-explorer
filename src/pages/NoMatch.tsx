import React, {Fragment} from "react"
import {Link} from "react-router-dom"
import BasePage from "../components/Common/BasePage"
import classes from './NoMatch.module.css'

const NoMatch = () => {
  return (
    <Fragment>
      <BasePage>
        <div className={classes.NoMatchBody}>
          <h1>Page not found</h1>
          <Link to='/' className={classes.NoMatchButton} >BACK TO HOME</Link>
        </div>
      </BasePage>
    </Fragment>
  )
}

export default React.memo(NoMatch)
