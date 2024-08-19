import { test } from '@playwright/test';
import { Screenshots } from "../_POM/Screenshots" 

test.describe("Login: ", () => {  
    test(`Screenshot of an empty login`, async ({page}) => {
      await page.goto("")
      const screenshots = new Screenshots(page)

      await screenshots.makeLoginBodyScreenshot("login")
    }) 
})