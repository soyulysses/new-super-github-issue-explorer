import classes from './Label.module.css'
import React from "react"

const Label = (props: any) => {

  const labelStyle = {
    backgroundColor: (!!props.color)  ? `#${props.color}30` : '',
    borderColor:     (!!props.color)  ? `#${props.color}` : '',
    borderRadius:    (!!props.square) ? '8px' : '',
    borderStyle:     (!!props.solid) ? 'solid' : ''
  }

  return(
    <div className={classes.label} style={labelStyle}>
      {props.icon}
      {' '}
      {props.name}
    </div>
  )
}

export default React.memo(Label)
