import {PriceRange} from "../interfaces/testData";

export enum ErrorFieldRegistration {
    Email = "email",
    Password = "password",
    ConfirmPassword = "confirmPassword",
    FirstName = "firstName",
    Surname = "surname",
}

export enum ErrorFieldLogin {
    Email = "email",
    Password = "password",
    General = "general",
}

export enum RegistrationErrors {
    NAME_REQUIRED = "First name is required.",
    SURNAME_REQUIRED = "Last name is required.",
    EMAIL_REQUIRED = "Email is required.",
    PASSWORD_REQUIRED = "New password is required.",
    CONFIRM_PASSWORD_REQUIRED = "Confirm new password is required.",
    EMAIL_INVALID = "Email option is invalid",
}

export enum LoginErrors {
    LOGIN_REQUIRED = "Email or mobile number is required.",
    LOGIN_INVALID = "Email or mobile number option is invalid",
    PASSWORD_REQUIRED = "Password is required.",
    LOGIN_ERROR = "Please enter a valid email or mobile number and password",
}

export enum ItemPageErrors {
    SIZE_NOT_CHOSEN = "Please select a size",
}

export enum Store {
    AE = "American",
    AERIE = "Aerie",
}

export enum DropdownItems {
    New = "Newest",
    Featured = "Featured",
    PriceLowHigh = "Price (low - high)",
    PriceHighLow = "Price (high - low)",
}

export const priceRanges: Record<string, PriceRange> = {
    empty: {min: 1000, max: 2000},
    correct: {min: 40, max: 100},
};

export enum commonMessages {
    emptyItemListMessage =
        "Sorry, we couldn't find what you were looking for."
}
