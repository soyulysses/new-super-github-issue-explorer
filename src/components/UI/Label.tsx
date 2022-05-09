import classes from './Label.module.css'

const Label = (props: any) => {
  const isDark = (color: string) => {
    color = (color.charAt(0) === '#') ? color.substring(1, 7) : color;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 178) ? "#000000":"#FFFFFF";
  }

  const labelColor = (!!props.color) ? {...props.style, backgroundColor: `#${props.color}30`, borderColor: `#${props.color}`} : {...props.style}
  const labelSquare = (!!props.square) ? {...labelColor, borderRadius: '8px'} : {...labelColor}

  return(
    <div className={classes.label} style={labelSquare}>
      {props.name}
    </div>
  )
}

export default Label