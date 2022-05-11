import classes from "./IssueBody.module.css";
import React from "react";

const IssueBody = (props:any) => {
  return (
    <div className={classes.IssueBody}>
      {props.children}
    </div>
  )
}

export default React.memo(IssueBody)