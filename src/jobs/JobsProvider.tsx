import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSnackbar } from "notistack";
import Pusher from "pusher-js";
import { useGET } from "../backend";
import { JobsContext } from "./JobsContext";
import { CompletedEvent, JobData, JobEvent } from "./model";
import { useEventBus } from "../utils";

const CHANNEL_NAME = "jobs";
const QUEUED_EVENT_NAME = "job.queued";
const STARTED_EVENT_NAME = "job.started";
const COMPLETED_EVENT_NAME = "job.completed";

export type JobsProviderProps = React.PropsWithChildren<{
  pusher: Pusher;
}>;

export function JobsProvider({ pusher, children }: JobsProviderProps) {
  const channel = useMemo(() => pusher.subscribe(CHANNEL_NAME), [pusher]);
  const { enqueueSnackbar } = useSnackbar();
  const [getList] = useGET("/jobs/active");
  const [activeJobs, setActiveJobs] = useState<JobData[]>([]);
  const [successEvent, dispatchSuccess] = useEventBus<JobData>();

  const queuedHandler = useCallback((data: JobEvent) => {
    setActiveJobs(jobs => [data.job, ...jobs]);
  }, []);
  const startedHandler = useCallback((data: JobEvent) => {
    setActiveJobs(jobs => {
      const job = jobs.find(x => x.id == data.job.id);
      if (job) {
        job.status = data.job.status;
        return [...jobs];
      } else {
        return jobs;
      }
    });
  }, []);
  const completedHandler = useCallback((data: CompletedEvent) => {
    enqueueSnackbar(data.message, { variant: data.success ? "success" : "error" });
    setActiveJobs(jobs => {
      const job = jobs.find(x => x.id == data.jobId);
      if (job) {
        if (data.success) {
          job.status = "Success";
          dispatchSuccess(job);
        } else {
          job.status = "Error";
        }

        return [...jobs];
      } else {
        return jobs;
      }
    });

    setTimeout(() => {
      setActiveJobs(jobs => jobs.filter(job => job.id != data.jobId));
    }, 10 * 1000);
  }, [enqueueSnackbar]);

  useEffect(() => {
    console.log("Bind handlers to job events");

    channel.bind(QUEUED_EVENT_NAME, queuedHandler);
    channel.bind(STARTED_EVENT_NAME, startedHandler);
    channel.bind(COMPLETED_EVENT_NAME, completedHandler);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [queuedHandler, startedHandler, completedHandler]);

  useEffect(() => {
    getList().then(setActiveJobs);
  }, [getList]);

  return (
    <JobsContext.Provider value={{
      activeJobs,
      jobSuccess: successEvent
    }}>
      {children}
    </JobsContext.Provider>
  );
}
