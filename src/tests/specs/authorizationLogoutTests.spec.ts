import { expect, test } from '@playwright/test';
import { Screenshots } from "../_POM/Screenshots" 
import { LoginLocators } from "../locators/LoginLocators" 
import { InteractingWithFields } from "../_POM/InteractingWithFields" 

test.describe("Login: ", () => { 
    test.beforeEach(async ({ page }) => {
      await page.goto("")
    }) 

    ;[
        {
        name_test: "Screenshot of successful authorization",
        },
        {
        name_test: "Logout",
        },
    ].map(({name_test}) => {
        test.describe(() => {
            //Немного измены ошибки сервера для правильного скриншота
            test(`${name_test}`, async ({page}) => {
                const screenshots = new Screenshots(page)
                const interactingWithFields = new InteractingWithFields(page)
                const loginLocators = new LoginLocators(page)

                await interactingWithFields.successRequest()
        
                await interactingWithFields.clickLogin()
        
                if (name_test === "Logout"){
                    await loginLocators.buttonLogout.click()
                    await expect(page).toHaveURL('')
                }else{
                    await screenshots.makeLoginBodyScreenshot("authorization")
                }
            }) 
        })
    })
})