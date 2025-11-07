import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage , RegisterPage } from '../src/pages/index.js';

const URL = 'https://realworld.qa.guru/';

test.describe('Регистрация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  })
  test('Успешная регистрация пользователя', async ({ page }) => {
    const user = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.register(user);

    await expect(mainPage.navigationBar).toContainText(user.name);
  });

  test('Неуспешная регистрация пользователя', async ({ page }) => {
    const user = {
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }

    //создаем экземпляры класса
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.wrongRegister(user);

    await expect(registerPage.emailErrorText).toContainText('Email already exists.. try logging in')
  });
})

