import { test } from '@playwright/test';
import { InteractingWithFields } from "../_POM/InteractingWithFields" 

test.describe("Login: ", () => { 
    test.beforeEach(async ({ page }) => {
      await page.goto("")
    }) 

    ;[
      {
        name_test: "Successful login and verification for code 200",
        username: "aqa",
        password: "AQA123",
        status: 200,
      },
      {
        name_test: "Incorrect username",
        username: "1",
        password: "AQA123",
        status: 401,
      },
      {
        name_test: "Incorrect password",
        username: "aqa",
        password: "1",
        status: 401,
      },
      {
        name_test: "Empty username and password",
        username: "",
        password: "",
        status: 401,
      },
    ].map(({name_test, username, password, status}) => {
        test.describe(() => {
            test(`${name_test}`, async ({page}) => {
                const interactingWithFields = new InteractingWithFields(page)
        
                await interactingWithFields.enterUsernameAndPassword(username, password)
        
                await interactingWithFields.loginWithStatus(status)
            })
        })
    })
})