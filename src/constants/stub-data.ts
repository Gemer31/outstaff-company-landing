import { IVacancy } from '@/models/common.model';
import { JobSchedule, JobType } from '@/models/enums';

export const STUB_VACANCIES: IVacancy[] = [
  {
    id: '1',
    title: "Middle/Senior Ruby Developer",
    type: JobType.DEVELOPER,
    experience: "1.5 years",
    description: "",
    hot: true,
    schedule: JobSchedule.REMOTE,
  },
  {
    id: '2',
    title: "Middle/Senior Java Developer",
    type: JobType.DEVELOPER,
    experience: "2 years",
    description: "",
    hot: false,
  },
  {
    id: '3',
    title: "Junior JS Developer",
    type: JobType.DEVELOPER,
    experience: "1.5 years",
    description: "",
    hot: true,
    schedule: JobSchedule.OFFICE,
  },
  {
    id: '4',
    title: "Phyton Developer",
    type: JobType.DEVELOPER,
    experience: "1 years",
    description: "",
    hot: false,
  },
]
