import { test } from '@playwright/test';
import { Screenshots } from "../_POM/Screenshots" 
import { LoginLocators } from "../locators/LoginLocators" 
import { InteractingWithFields } from "../_POM/InteractingWithFields" 

test.describe("Login: ", () => { 
    test.beforeEach(async ({ page }) => {
      await page.goto("")
    }) 

    ;[
        {
            name_test: "Wrong username or password (username)",
            username: "1",
            password: "AQA123",
            errorText: "Wrong username or password",
        },
        {
            name_test: "Wrong username or password (password)",
            username: "aqa",
            password: "1",
            errorText: "Wrong username or password",
        },
        {
            name_test: "Validation (804720 simbol)",
            username: 'a'.repeat(804720),
            password: 'a'.repeat(804720),
            errorText: "An error occurred during login.",
        },
        {
            //Тест для будущих исправлений
            name_test: "Username too short",
            username: "a",
            password: "AQA123",
            errorText: "Username must be at least 3 characters long",
        },
        {
            //Тест для будущих исправлений
            name_test: "Password too short",
            username: "aqa",
            password: "12",
            errorText: "Password must be at least 6 characters long",
        },
    ].map(({name_test, username, password, errorText}) => {
        test.describe(() => {
            test(`${name_test}`, async ({page}) => {
                const loginLocators = new LoginLocators(page)
                const screenshots = new Screenshots(page)
                const interactingWithFields = new InteractingWithFields(page)

                await interactingWithFields.enterUsernameAndPassword(username, password)

                await interactingWithFields.clickLogin()

                if (name_test === "Wrong username or password (username)" || name_test === "Wrong username or password (password)"){
                    await screenshots.makeLoginBodyScreenshot("wrongUsernameOrPassword", [loginLocators.fieldUsername, loginLocators.fieldPassword])
                }
                
                await interactingWithFields.expectValidation(errorText)
            })
        })
    })
})