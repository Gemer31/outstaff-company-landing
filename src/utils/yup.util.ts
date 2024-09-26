import * as yup from 'yup';

export class YupUtil {
  private static userName = yup.string().matches(/^[A-Za-zА-Яа-я ]+$/);
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
      name: YupUtil.userName,
      phone: yup.string(),
      email: YupUtil.email,
      password: YupUtil.password,
      passwordRepeat: YupUtil.passwordRepeat,
    });
  }
}