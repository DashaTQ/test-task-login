import { expect, Page, Locator } from "@playwright/test" 

export class Screenshots {
    private _page: Page 

    constructor(page: Page) {
        this._page = page 
    }

    public makeLoginBodyScreenshot = async (name: string, maskLocators?: Locator[]): Promise<void> => {
        try {
            const screenshot = await this._page.locator('body').boundingBox()

            const options: any = {
                clip: screenshot || undefined,
            }

            if (maskLocators && maskLocators.length > 0) {
                options.mask = maskLocators;
            }

            await expect(this._page).toHaveScreenshot(`${name}.png`, options)
        } catch (error) {
            console.error(`Скриншот упал для ${name}.png. 
            Некоторые тесты сделаны с заведомой ошибкой, такие как: Wrong username or password (username) и Wrong username or password (password)`
        )
            throw error
        }
    }
}