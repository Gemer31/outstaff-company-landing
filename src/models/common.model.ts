import { JobSchedule, JobType } from '@/models/enums';

export interface IConfig {
    email: string;
    phone: string;
}

export interface ISpecializationCard {
    title: string;
    icons: string[];
    description: string;
}

export interface IVacancy {
    id: string;
    title: string;
    type: JobType;
    schedule: JobSchedule,
    experience: string;
    description: string;
    hot: boolean;
}
