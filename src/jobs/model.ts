export type JobStatus = "Queued" | "Running" | "Success" | "Error";

export type JobData = {
    id: string;
    name: string;
    userId: string | null;
    userEmail: string | null;
    status: JobStatus;
    error: ErrorData | null;
    startedAt: string;
    completedAt: string;
};

export type ErrorData = {
    type: string;
    message: string;
    stackTrace: string | null;
    innerError: ErrorData | null;
};

export type JobEvent = {
    job: JobData;
};

export type CompletedEvent = {
    jobId: string;
    success: boolean;
    message: string;
};
