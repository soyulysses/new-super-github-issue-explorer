import React, {Fragment} from "react";

const NoMatch = (props: any) => {
  return (
    <Fragment>
      <h1>Error 404 - Page not found</h1>
    </Fragment>
  )
}

export default React.memo(NoMatch)