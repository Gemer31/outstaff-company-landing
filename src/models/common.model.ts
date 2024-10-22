import { JobSchedule, JobType } from '@/models/enums';

export interface IConfig {
    email: string;
    counterBlocksVisible?: boolean;
    customersBlockVisible?: boolean;
}

export interface ISpecializationCard {
    title: string;
    icons: string[];
    description: string;
}

export interface IVacancy extends IOrder {
    id: string;
    title: string;
    type: JobType;
    schedule: JobSchedule,
    experience: string;
    description: string;
    hot: boolean;
}

export interface ICounterBlock extends IOrder {
    id: string;
    number: number;
    text: string;
    numberPostfix?: string;
}

export interface IOrder {
    order: number;
}
