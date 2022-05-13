import {useRef} from "react"
import classes from "./MainSearchForm.module.css";

const MainSearchForm = (props: any) => {
  const userRef = useRef<any>()
  const repoRef = useRef<any>()

  function handlerSubmit(event: any) {
    event.preventDefault()
    props.onSubmit(userRef.current.value, repoRef.current.value)
  }

  return (
    <form className={classes.Form} onSubmit={handlerSubmit}>
      <input ref={userRef} className={classes.TextInput} placeholder='User' type='text' />
      <input ref={repoRef} className={classes.TextInput} placeholder='Repository' type='text' />
      <button className={classes.Button}>Search</button>
    </form>
  )
}

export default MainSearchForm