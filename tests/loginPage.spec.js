import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage, MainPage } from '../src/pages/index.js';

const URL = 'https://realworld.qa.guru/';

test.describe('Авторизация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  })
  test('Неуспешная авторизация пользователя', async ({ page }) => {
   
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.gotoLogin();
    await loginPage.login(user); 
    await expect(loginPage.messageError).toContainText('Email not found sign in first');
  });

  test('Успешная авторизация пользователя', async ({ page }) => {
   
    const user = {
      name: 'sa',
      email: 'login@ya.ru',
      password: 'password',
    }
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);

    await mainPage.gotoLogin();
    await loginPage.login(user); 

    await expect(mainPage.navigationBar).toContainText(user.name);
  });
})

