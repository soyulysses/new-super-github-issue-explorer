import React, {Fragment} from "react";
import Label from "../../components/UI/Label";
import classes from "./IssueUserName.module.css";

const IssueUserName = (props: any) => {

  let color;

  switch (props.label) {
    case 'COLLABORATOR':
      color = '00ffb3'
      break;
    case 'MEMBER':
      color = '009060'
      break;
    case 'CONTRIBUTOR':
      color = '004D2E'
      break;
    default:
      color = '808080'
      break;
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