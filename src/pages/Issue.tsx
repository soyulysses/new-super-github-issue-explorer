import React, {Fragment} from "react";
import Header from "../components/UI/Header";
import classes from "../components/UI/Header.module.css";
import {Link, useParams} from "react-router-dom";
import Card from "../components/UI/Card";

const Issue = (props: any) => {
  const {userId, repoId, issueId} = useParams();

  return (
    <Fragment>
      <Header>
        <Link to='/' className={classes.header_button}>{"‹ BACK"}</Link>
      </Header>
      <main>
        <Card>
          <h1>{userId + " / " + repoId}</h1>
          <h2>{"Issue: " + issueId}</h2>
        </Card>
      </main>
    </Fragment>
  )
}

export default Issue