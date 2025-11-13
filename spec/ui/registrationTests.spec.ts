import {test, expect} from '../../src/fixtures/fixture'
import {RegistrationPage} from "../../src/pages/RegistrationPage/RegistrationPage";
import {User} from "../../src/valueObjects/NewUser";
import {RegistrationErrors} from "../../src/constants/common.const";
import {ErrorFieldRegistration} from "../../src/constants/common.const";
import {RegistrationSteps} from "../../src/steps/RegistrationSteps";
import {faker} from "@faker-js/faker";

test.describe("Registration flow", () => {
    let user: User;
    let registrationPage: RegistrationPage;
    let steps: RegistrationSteps;

    test.beforeEach(async ({app, page}) => {
        registrationPage = new RegistrationPage(page);
        steps = new RegistrationSteps(app);
    });

    test("Directly open registration page and create new account", async () => {
        user = User.generateRandomUser();

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();

        expect(await steps.assertSuccess()).toBeTruthy();
    });

    test("Submit button disabled without accepted terms", async ({}) => {
        user = User.generateRandomUser();

        await steps.openPage();
        await steps.fillFields(user);
        expect(await steps.assertButtonSubmitDisabled()).toBeTruthy();
    });

    test("Error after registration with empty name", async ({}) => {
        user = User.generateWithEmptyFields(["firstName"]);

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();
        await steps.assertErrorText(
            ErrorFieldRegistration.FirstName,
            RegistrationErrors.NAME_REQUIRED
        );
    });

    test("Error after registration with empty surname", async ({}) => {
        user = User.generateWithEmptyFields(["lastName"]);

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();
        await steps.assertErrorText(
            ErrorFieldRegistration.Surname,
            RegistrationErrors.SURNAME_REQUIRED
        );
    });

    test("Error after registration with empty email", async ({}) => {
        user = User.generateWithEmptyFields(["email"]);

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();
        await steps.assertErrorText(
            ErrorFieldRegistration.Email,
            RegistrationErrors.EMAIL_REQUIRED
        );
    });

    test("Error after registration with empty password", async ({}) => {
        user = User.generateWithEmptyFields(["password"]);

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();
        await steps.assertErrorText(
            ErrorFieldRegistration.Password,
            RegistrationErrors.PASSWORD_REQUIRED
        );
        await steps.assertErrorText(
            ErrorFieldRegistration.ConfirmPassword,
            RegistrationErrors.CONFIRM_PASSWORD_REQUIRED
        );
    });

    test("Error after registration with invalid email", async ({}) => {
        user = User.generateUserWithInvalidEmail();

        await steps.openPage();
        await steps.fillFields(user);
        await steps.checkTerms();
        await steps.submit();
        await steps.assertErrorText(
            ErrorFieldRegistration.Email,
            RegistrationErrors.EMAIL_INVALID
        );
    });

    test("Error after confirmation registration with different password", async ({}) => {
        user = User.generateRandomUser();

        await steps.openPage();
        await steps.fillFields(user, faker.internet.password());
        await steps.checkTerms();
        await steps.submit();
        expect(
            await registrationPage.isValidationFailed(
                ErrorFieldRegistration.ConfirmPassword
            )
        ).toBeTruthy();
    });
});
