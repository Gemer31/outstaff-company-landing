export enum RouterLinks {
    HOME = '/',
    CONTACTS = '/contacts',
    VACANCIES = "/vacancies",
    EDITOR = "/editor",
    SIGN_IN = "/signIn",
}

export enum DomIds {
    NOTIFICATION = 'notification',
    CONTACT_US_POPUP_ID = 'contactUsPopupId',
    POPUP_ID = 'popupId',
    POPUP_TITLE = "popupTitle",
    POPUP_CONTENT = "popupContent",
}

export enum ContactLinkType {
    PHONE = "phone",
    MAIL = "mail",
    TELEGRAM = "telegram"
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
    DEVELOPER = "developer",
    SUPPORT = "support",
    QA = "qa",
    TECHNICAL_ARCHITECT = "technicalArchitect",
    PRODUCT_MANAGER = "productManager",
    ANALYST = "analyst",
}

export enum JobSchedule {
    REMOTE = "remote",
    OFFICE = "office",
}

export enum SpecializationCardSize {
    LARGE = 'large',
    NORMAL = 'normal',
}
