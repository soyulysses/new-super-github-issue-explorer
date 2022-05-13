import BasePage from "../components/Common/BasePage";
import MainSearchForm from "./Main/MainSearchForm";
import classes from "./Main.module.css";
import {useNavigate} from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  function onSubmitSearch (user: any, repo: any) {
    navigate(`/search/${user}/${repo}`)
  }

  return (
    <BasePage>
      <div className={classes.MainBody}>
        <MainSearchForm onSubmit={onSubmitSearch} />
      </div>
    </BasePage>
  )
}

export default Main