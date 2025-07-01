import React, { Fragment } from "react";
import { Link, Typography } from "@material-ui/core";
import { useAppMetadata } from "../core/ApplicationContext";

export function Copyright() {
  const metadata = useAppMetadata();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://codeparts.net">
        Codeparts
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      <br />
      v{metadata.version}
      {
        metadata.versionHash &&
        <Fragment>
          <br />
          {metadata.versionHash}
        </Fragment>
      }
    </Typography>
  );
}
