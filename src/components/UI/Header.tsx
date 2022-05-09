import classes from "./Header.module.css";
import React, {Fragment} from "react";

const Header = (props: any) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.header_title}>
          <h1>
            <span>NEW SUPER</span>
            Github Issue Explorer
          </h1>
        </div>
        <div className={classes.header_body}>
          {props.children}
        </div>
      </header>
    </Fragment>
  )
}

export default React.memo(Header)