import { createContext, useContext } from "react";
import { JobData } from "./model";
import { EventBus } from "../utils";

export interface IJobsContext {
  activeJobs: JobData[];
  jobSuccess: EventBus<JobData>;
}

export const JobsContext = createContext<IJobsContext>(undefined!);

export const useJobs = () => useContext(JobsContext);
