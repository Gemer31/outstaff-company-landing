import { JobSchedule, JobType } from '@/models/enums';

export interface IConfig {
    email: string;
    telegramLink: string;
    companyInfo: string;
    counterBlocksVisible?: boolean;
    customersBlockVisible?: boolean;
    displayVacanciesAsSliderOnMainPage?: boolean;
    vacanciesSlideElementsCount?: number;
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
    hot: boolean;
    type: JobType;
    schedule: JobSchedule;
    localization: {
        en: IVacancyInfo;
        ru: IVacancyInfo;
    };
}

export interface IVacancyInfo {
    title: string;
    experience: string;
    description: string;
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
