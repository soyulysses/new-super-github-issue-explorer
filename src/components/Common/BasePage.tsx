import React, {Fragment} from "react"
import Header from "../UI/Header"
import classes from "./BasePage.module.css"

const BasePage = (props: any) => {
  return (
    <Fragment>
      <Header>
        {props.childrenHeader}
      </Header>
      <main className={classes.Main}>
        {props.children}
      </main>
    </Fragment>
  )
}

export default BasePage
