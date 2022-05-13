import Label from "../../../components/UI/Label"
import React, {Fragment} from "react"
import classes from "./IssueTitle.module.css"
import {IssueType} from "../../Issue"

const IssueTitle = (props: any) => {
  return (
    <Fragment>
      <h2 className={classes.IssueTitle}>
        <a href={props.url}>
          <Label solid square color={(props.type === IssueType.ISSUE) ? 'ff6f61' : '00a1ff'} name={(props.type === IssueType.ISSUE) ? '⚠️ Issue' : '📦 Pull Request'} />
          {' '}
          {(!!props.date) ? `${props.title} · ${props.date}` : `${props.title}`}
        </a>
      </h2>
    </Fragment>
  )
}

export default React.memo(IssueTitle)
