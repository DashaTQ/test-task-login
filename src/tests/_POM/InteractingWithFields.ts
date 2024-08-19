import { Page,expect } from "@playwright/test" 
import { LoginLocators } from "../locators/LoginLocators"
import { LoginAPI } from "../_API/LoginAPI" 

export class InteractingWithFields {
    private _page: Page 

    constructor(page: Page) {
        this._page = page 
    }

    public enterUsernameAndPassword = async (username: string, password: string): Promise<void> => {
        const loginLocators = new LoginLocators(this._page)
        
        await loginLocators.fieldUsername.fill(username)
        await loginLocators.fieldPassword.fill(password)
    }

    public clickLogin = async (): Promise<void> => {
        const loginLocators = new LoginLocators(this._page)
        
        await loginLocators.buttonLogin.click()
    }

    public loginWithStatus = async (expectedStatus: number): Promise<void> => {
        const loginLocators = new LoginLocators(this._page);
        const loginAPI = new LoginAPI();
    
        try {
            const [response] = await Promise.all([
                this._page.waitForResponse(
                    (resp) => resp.url().includes(loginAPI.login)
                ),
                loginLocators.buttonLogin.click(),
            ]);
    
            const actualStatus = response.status();
    
            //Некоторые тесты сделаны с ожидаемой ошибкой
            //Такие как: 
            //Empty username and password
            //Incorrect username
            if (actualStatus !== expectedStatus) {
                throw new Error(`Логин провалился. Ожидался статус: ${expectedStatus}, но пришел: ${actualStatus}. (Смотреть комментарий)`);
            }
    
        } catch (error) {
            console.error(`Ошибка при входе в систему: ${error.message}`);
            throw error
        }
    }

    public successRequest = async (): Promise<void> => {
        const loginAPI = new LoginAPI()

        await this._page.route(loginAPI.login, (route) => {
            route.fulfill({
                status: 200,
                body: JSON.stringify({
                  "status": "success"
              }),
            });
          });
    
          await this._page.route('/welcome', (route) => {
            route.continue()
          });
    }

    public expectValidation = async (errorText: string): Promise<void> => {
        await expect(this._page.locator("[id='message']")).toHaveText(errorText)
    }
}