import * as yup from 'yup';

export class YupUtil {
  private static userName = yup.string().matches(/^[A-Za-zА-Яа-я ]+$/).required('fieldRequired');
  private static email = yup
    .string()
    .required('fieldRequired')
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
      phone: yup.string().required('fieldRequired'),
      // email: YupUtil.email,
      // password: YupUtil.password,
      // passwordRepeat: YupUtil.passwordRepeat,
    });
  }

  static get ContactUsFormDetailedSchema() {
    return yup.object().shape({
      yourOrCompanyName: YupUtil.userName,
      phone: yup.string().required('fieldRequired'),
      email: YupUtil.email,
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
      phone: yup.string().required('fieldRequired'),
    });
  }

  static get VacanciesFormSchema() {
    return yup.object().shape({
      title: yup.string().required(),
      experience: yup.string(),
      description: yup.string().required(),
      type: yup.string().required(),
      schedule: yup.string().required(),
      hot: yup.boolean(),
    });
  }
}
