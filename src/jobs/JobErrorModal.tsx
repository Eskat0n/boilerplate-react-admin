import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { EditModalProps } from "../modals";
import { Stack } from "../layout";
import { ErrorData, JobData } from "./model";

const renderError = (error?: ErrorData | null): React.ReactChild => (
  error ? (
    <React.Fragment>
      <div>
        <Typography variant="caption">
          {error.type}
        </Typography>
        <Typography variant="body1">
          {error.message}
        </Typography>
      </div>
      {renderError(error.innerError)}
    </React.Fragment>
  ) : <React.Fragment />
);

export const JobErrorModal = (props: EditModalProps<JobData>) => {
  const error = props.item?.error;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle>
        Error details
      </DialogTitle>
      <DialogContent>
        <Stack>
          {renderError(error)}
          {
            error?.stackTrace &&
            <pre><code>{error.stackTrace}</code></pre>
          }
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
