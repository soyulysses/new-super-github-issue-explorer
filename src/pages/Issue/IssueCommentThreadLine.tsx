import React, {Fragment} from "react"
import classes from "./IssueCommentThreadLine.module.css"

const IssueCommentThreadLine = () => {
  return (
    <Fragment>
      <div className={classes.IssueCommentThreadLine}>
        <div className={classes.Line} />
      </div>
    </Fragment>
  )
}

export default React.memo(IssueCommentThreadLine)
