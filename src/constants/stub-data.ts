import { IConfig } from "@/models/common.model";

export const CONFIG: IConfig = {
  email: "mail@mail.ru",
  phone: "80291111111"
}

export enum JobType {
  DEVELOPER = "Developer",
  SUPPORT = "Support",
  QUALITY_ASSURANCE = "Quality Assurance",
  IT_INFRASTRUCTURE = "IT Infrastructure",
  TECHNICAL_ARCHITECT = "Technical Architect",
  PRODUCT_MANAGER = "Product Manager",
  ANALYST = "Analyst"
}

export enum JobSchedule {
  REMOTE = "Remote",
  OFFICE = "Office",
}

export interface IVacancy {
  title: string;
  type: JobType;
  experience: string;
  description: string;
  hot: boolean;
}

export const STUB_VACANCIES: IVacancy[] = [
  {
    title: "Middle/Senior Ruby Developer",
    type: JobType.DEVELOPER,
    experience: "1.5 years",
    description: "",
    hot: true,
  },
  {
    title: "Middle/Senior Java Developer",
    type: JobType.DEVELOPER,
    experience: "2 years",
    description: "",
    hot: false,
  },
  {
    title: "Junior JS Developer",
    type: JobType.DEVELOPER,
    experience: "1.5 years",
    description: "",
    hot: true,
  },
  {
    title: "Phyton Developer",
    type: JobType.DEVELOPER,
    experience: "1 years",
    description: "",
    hot: false,
  },
]
