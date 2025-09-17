import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage, MainPage, ProfilePage, EditorPage } from '../src/pages/index.js';

const URL = 'https://realworld.qa.guru/';
const URL_PROFILE = 'https://realworld.qa.guru/#/profile/sa';

test.describe('Профиль', () => {

  test('Добавить статью в избранное', async ({ page }) => {
    await page.goto(URL);

    const user = {
      name: 'sa',
      email: 'login@ya.ru',
      password: 'password',
    }

    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const editorPage = new EditorPage(page);
    const profilePage = new ProfilePage(page);

    await mainPage.gotoLogin();
    await loginPage.login(user); 

    await expect(mainPage.navigationBar).toContainText(user.name);
    await mainPage.newArticleButton.click();
    const article = {
          title: faker.internet.password(),
          description: faker.food.fruit(),
          text: faker.food.description(),
        }
    
    await editorPage.createNewArticle(article);
    
    await expect(editorPage.articleTitle).toContainText(article.title);

    await page.goto(URL_PROFILE);
    await profilePage.favoritedArticle(article);
    
    await expect(profilePage.getArticleByTitle(article.title)).toContainText(article.title);
  });
})

