export enum RouterLinks {
  HOME = '/',
  CONTACTS = '/contacts',
  VACANCIES = '/vacancies',
  EDITOR = '/editor',
  SIGN_IN = '/signIn',
  NOT_FOUND = '/not-found'
}

export enum DomIds {
  NOTIFICATION = 'notification',
  CONTACT_US_POPUP_ID = 'contactUsPopupId',
  POPUP_ID = 'popupId',
  POPUP_TITLE = 'popupTitle',
  POPUP_CONTENT = 'popupContent',
}

export enum ContactLinkType {
  PHONE = 'phone',
  MAIL = 'mail',
  TELEGRAM = 'telegram'
}

export enum FirestoreCollections {
  SETTINGS = 'settings',
  COUNTER_BLOCKS = 'counterBlocks',
  CUSTOMERS_BLOCK = 'customersBlock',
  VACANCIES = 'vacancies',
}

export enum ButtonColorOptions {
  RED = 'red',
  GRAY = 'gray',
}

export enum ButtonTypes {
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export enum EditGroup {
  GENERAL = 'general',
  COUNTER_BLOCKS = 'counterBlocks',
  VACANCIES = 'vacancies',
  CUSTOMERS_BLOCK = 'customersBlock',
  IMAGES = 'images',
}

export enum FirestoreDocuments {
  CONFIG = 'config',
}

export enum JobType {
  DEVELOPER = 'developer',
  QA = 'qa',
  TECHNICAL_ARCHITECT = 'architect',
  PRODUCT_MANAGER = 'manager',
  ANALYST = 'analyst',
  DESIGNER = 'designer',
}

export enum JobSchedule {
  REMOTE = 'remote',
  OFFICE = 'office',
}

export enum SpecializationCardSize {
  LARGE = 'large',
  NORMAL = 'normal',
}
