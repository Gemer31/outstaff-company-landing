export interface IConfig {
    email: string;
    phone: string;
}

export interface ISpecializationCard {
    title: string;
    icons: {
        path: string;
        alt: string;
    }[];
    description: string;
}