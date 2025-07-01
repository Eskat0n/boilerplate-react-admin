import React from "react";
import {
  colors,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import dayjs from "dayjs";
import { useEditModal } from "../modals";
import { JobData } from "./model";
import { JobErrorModal } from "./JobErrorModal";

type JobListViewProps = {
  jobs: JobData[];
  showDuration?: boolean;
  showUser?: boolean;
  enableErrorModal?: boolean;
};

export const JobListView = ({ jobs, ...props }: JobListViewProps) => {
  const errorModal = useEditModal<JobData>();

  return (
    <React.Fragment>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell style={{ width: 140 }}>Status</TableCell>
              {
                props.showDuration &&
                <TableCell>Duration</TableCell>
              }
              <TableCell>Started at</TableCell>
              {
                props.showUser &&
                <TableCell>Started by</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map(job =>
              <TableRow key={job.id}>
                <TableCell>{job.name}</TableCell>
                <TableCell>
                  {
                    job.status == "Queued" &&
                    <Typography variant="body2" color="textSecondary">
                      Queued
                    </Typography>
                  }
                  {
                    job.status == "Running" &&
                    <LinearProgress />
                  }
                  {
                    job.status == "Success" &&
                    <Typography variant="body2" style={{ color: colors.green[500] }}>
                      Completed
                    </Typography>
                  }
                  {
                    job.status == "Error" && props.enableErrorModal &&
                    <Typography variant="body2" color="secondary">
                      Error
                      {
                        job.error &&
                        <Tooltip title={"Error details"}>
                          <IconButton
                            size="small"
                            onClick={() => errorModal.open(job)}
                          >
                            <InfoIcon fontSize="inherit" />
                          </IconButton>
                        </Tooltip>
                      }
                    </Typography>
                  }
                </TableCell>
                {
                  props.showDuration &&
                  <TableCell>
                    {dayjs(job.completedAt).diff(job.startedAt, "minutes") < 1
                      ? `${dayjs(job.completedAt).diff(job.startedAt, "seconds")}s`
                      : `${dayjs(job.completedAt).diff(job.startedAt, "minutes")}min`}
                  </TableCell>
                }
                <TableCell>{dayjs(job.startedAt).format("lll")}</TableCell>
                {
                  props.showUser &&
                  <TableCell>{job.userEmail ?? "-"}</TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <JobErrorModal
        isOpen={errorModal.isOpen}
        item={errorModal.model}
        onSuccess={() => null}
        onClose={errorModal.close}
      />
    </React.Fragment>
  );
};
