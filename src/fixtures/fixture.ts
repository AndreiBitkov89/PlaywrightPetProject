import {test as base} from "@playwright/test";
import {AppContext} from "../steps/AppContext";

type Fixtures = { app: AppContext };

export const test = base.extend<Fixtures>({
    app: async ({page}, use) => {
        const app = new AppContext(page);
        await use(app);
    },
});
export const expect = test.expect;