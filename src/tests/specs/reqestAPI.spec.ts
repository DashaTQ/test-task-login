import { expect, test } from '@playwright/test';

test.describe("Login API: ", () => { 
    ;[
        //SQL-инъекции не делала - нет базы + большинство современных ЯП от них защищены 
        {
            name_test: "Wrong username (invalid username)",
            username: "1", 
            password: "AQA123",
            expectedStatusCode: 404,
            errorText: "User not found",
        },
        {
            name_test: "Wrong password (valid username, invalid password)",
            username: "aqa", 
            password: "wrongPassword", 
            expectedStatusCode: 401, 
            errorText: "Incorrect password", 
        },
        {
            name_test: "Successful login (valid credentials)",
            username: "aqa",
            password: "AQA123",
            expectedStatusCode: 200, 
            successMessage: "Logged in successfully",
        },
        {
            //Запланированная ошибка для пустого имени
            name_test: "Missing username",
            username: "",
            password: "AQA123",
            expectedStatusCode: 404,
            errorText: "Username is required",
        },
        {
            //Запланированная ошибка для пустого пароля
            name_test: "Missing password",
            username: "aqa",
            password: "",
            expectedStatusCode: 401,
            errorText: "Password is required",
        },
        {
            //По идее другая ошибка должна быть, придусмотренная беком, но ее нет => тест на будущее исправлние
            name_test: "Username too short",
            username: "a",
            password: "AQA123",
            expectedStatusCode: 400, //или 406
            errorText: "Username must be at least 3 characters long",
        },
        {
            //По идее другая ошибка должна быть, придусмотренная беком, но ее нет => тест на будущее исправлние
            name_test: "Password too short",
            username: "aqa",
            password: "12",
            expectedStatusCode: 400, //или 406
            errorText: "Password must be at least 6 characters long",
        },
        {
            name_test: "Special characters in username",
            username: "admin$%@#", 
            password: "AQA123",
            expectedStatusCode: 404,
            errorText: "User not found",
        },
        {
            //Тоже на будущее исправление бага
            name_test: "Empty request body",
            username: undefined,
            password: undefined,
            expectedStatusCode: 400,
            errorText: "Request body cannot be empty",
            rawData: {}, 
        },
        {
            //Все на будущее исправление
            name_test: "Invalid JSON format",
            rawData: "{ username: aqa, password: AQA123 }",
            expectedStatusCode: 400,
            errorText: "Invalid JSON format",
        },
    ].map(({ name_test, username, password, expectedStatusCode, errorText, successMessage, rawData }) => {
        test(name_test, async ({ request }) => {
            const data = rawData ? rawData : { username, password };
            const response = await request.post('api/login', {
                data,
            });

            expect(response.status()).toBe(expectedStatusCode);

            const responseBody = await response.json();

            if (expectedStatusCode === 200) {
                expect(responseBody).toEqual({
                    status: "success",
                    message: successMessage
                });
            } else {
                expect(responseBody).toEqual({
                    status: "error",
                    message: errorText
                });
            }
        });
    });
});
