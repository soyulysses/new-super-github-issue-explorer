import React, {Fragment} from "react"
import Label from "../../../components/UI/Label"
import classes from "./IssueUserName.module.css"

const IssueUserName = (props: any) => {

  let color;

  switch (props.label) {
    case 'COLLABORATOR':
      color = '00ffb3'
      break
    case 'MEMBER':
      color = '00E3FF'
      break
    case 'CONTRIBUTOR':
      color = 'FFBE00'
      break
    case 'BOT':
      color = '00D0FF'
      break
    default:
      color = 'FFFFFF'
      break
  }

  return (
    <Fragment>
      <h3 className={classes.IssueUserName}>
        <Label square name={(props.label !== 'NONE') ? props.label : 'USER'} color={color} />
        {props.name}
      </h3>
    </Fragment>
  )
}

export default React.memo(IssueUserName)
