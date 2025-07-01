import React from "react";
import {
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { useJobs } from "./JobsContext";
import { JobListView } from "./JobListView";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

export const ActiveJobsView = () => {
  const classes = useStyles();
  const { activeJobs } = useJobs();

  if (!activeJobs || activeJobs.length == 0)
    return <React.Fragment />;

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title} variant="body1" gutterBottom>
        Active jobs
      </Typography>
      <JobListView jobs={activeJobs} />
    </Paper>
  );
};
