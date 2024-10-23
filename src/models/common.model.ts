import { JobSchedule, JobType } from '@/models/enums';

export interface IConfig {
    email: string;
    counterBlocksVisible?: boolean;
    customersBlockVisible?: boolean;
}

export interface ICustomersBlock {
    images: string[];
    itemsAmountOnPage: number;
    autoplay?: boolean;
}

export interface PlainStorageReference {
    name: string;
    bucket: string;
    fullPath: string;
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
