import { test, expect } from '@playwright/test';
import { EditorPage, LoginPage, MainPage, RegisterPage } from '../src/pages/index.js';
import { title } from 'process';
import { faker } from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';

test.describe('Посты', () => {
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

    await expect(mainPage.navigationBar).toContainText(user.name);

    await mainPage.newArticleButton.click();
  })

  test('Создание поста', async ({ page }) => {
   
    const article = {
      title: faker.internet.password(),
      description: faker.food.fruit(),
      text: faker.food.description(),
    }

    const editorPage = new EditorPage(page);

    await editorPage.createNewArticle(article);

    await expect(editorPage.articleTitle).toContainText(article.title);
  });
  
  test('Удаление поста', async ({ page }) => {
   
    const article = {
      title: faker.internet.password(),
      description: faker.food.fruit(),
      text: faker.food.description(),
    }

    const editorPage = new EditorPage(page);
    const mainPage = new MainPage(page);
    
    await editorPage.createNewArticle(article);

    await expect(editorPage.articleTitle).toContainText(article.title);

    await editorPage.deleteArticle();

    await expect(mainPage.messageText).toContainText('Articles not available.');
  });
  

  test('Редактирование поста', async ({ page }) => {
   
    const article = {
      title: faker.internet.password(),
      description: faker.food.fruit(),
      text: faker.food.description(),
      newTitle: faker.internet.password(),
    }

    const editorPage = new EditorPage(page);
    
    await editorPage.createNewArticle(article);

    await expect(editorPage.articleTitle).toContainText(article.title);

    await editorPage.updateArticle(article);

    await expect(editorPage.articleTitle).toContainText(article.newTitle);
  });
})

