import {Locator, Page} from "@playwright/test"

export class LoginLocators {
    readonly page: Page

    fieldUsername: Locator
    fieldPassword: Locator
    buttonLogin: Locator
    buttonLogout: Locator

    constructor(page: Page) {
        this.page = page

        this.fieldUsername = page.locator("[id=username]")
        this.fieldPassword = page.locator("[id=password]")
        this.buttonLogin = page.getByRole('button', { name: 'Login' })
        this.buttonLogout = page.getByRole('button', { name: 'Logout' })
    }
}