import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage , RegisterPage } from '../src/pages/index.js';

const URL = 'https://realworld.qa.guru/';

test.describe('Начальная страница', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const user = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.register(user);
  })

  test('Отображение пустой страницы "Your Feed"', async ({ page }) => {

    //создаем экземпляры класса
    const mainPage = new MainPage(page);

    await mainPage.yourFeedButton.click();
    await expect(mainPage.messageText).toContainText('Articles not available.');
  });
})

