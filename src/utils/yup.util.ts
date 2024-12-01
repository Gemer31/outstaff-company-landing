import * as yup from 'yup';

export class YupUtil {
  private static userName = yup.string().required('fieldRequired');
  private static email = yup
    .string()
    .email('fieldInvalid');
  private static price = yup
    .string()
    .matches(/^\d*(\.\d{2})?$/, 'invalidPrice')
    .required('fieldRequired');
  private static password = yup
    .string()
    .required('fieldRequired')
    .min(6, 'passwordIsInvalid');
  private static passwordRepeat = yup
    .string()
    .required('fieldRequired')
    .oneOf([yup.ref('password')], 'passwordMustMatch');

  static get ContactUsFormSchema() {
    return yup.object().shape({
      yourOrCompanyName: YupUtil.userName,
      email: YupUtil.email.required('fieldRequired'),
      // phone: yup.string().required('fieldRequired'),
    });
  }

  static get ContactUsFormDetailedSchema() {
    return yup.object().shape({
      yourOrCompanyName: YupUtil.userName,
      // phone: yup.string().required('fieldRequired'),
      email: YupUtil.email.required('fieldRequired'),
      message: yup.string(),
    });
  }

  static get SignInSchema() {
    return yup.object().shape({
      email: YupUtil.email,
      password: YupUtil.password,
    });
  }

  static get GeneralEditorFormSchema() {
    return yup.object().shape({
      email: YupUtil.email,
      telegramLink: yup.string().required('fieldRequired'),
      companyInfo: yup.string().required('fieldRequired'),
      counterBlocksVisible: yup.boolean(),
      customersBlockVisible: yup.boolean(),
    });
  }

  static get CounterBlockSchema() {
    return yup.object().shape({
      id: yup.string(),
      order: yup.number(),
      number: yup.number().required('fieldRequired'),
      text: yup.string().required('fieldRequired'),
      numberPostfix: yup.string(),
    });
  }

  static get customersBlockSchema() {
    return yup.object().shape({
      itemsAmountOnPage: yup.number().required('fieldRequired'),
      images: yup.array().required('fieldRequired'),
      autoplay: yup.boolean(),
    });
  }

  static get VacanciesFormSchema() {
    return yup.object().shape({
      id: yup.string(),
      titleRu: yup.string().required(),
      titleEn: yup.string(),
      experienceRu: yup.string().required(),
      experienceEn: yup.string(),
      descriptionRu: yup.string().required(),
      descriptionEn: yup.string(),
      type: yup.string().required(),
      schedule: yup.string().required(),
      hot: yup.boolean(),
    });
  }
}
