export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.myArticlesLink = page.getByRole('link', { name: 'My Articles' });
        this.favoritedArticlesLink = page.getByRole('link', { name: 'Favorited Articles' });
        this.favoritedButton = page.getByRole('button').first();
    }

    async favoritedArticle(article) {
        await this.myArticlesLink.click();
        await this.favoritedButton.click();
        await this.favoritedArticlesLink.click();
    }
    getArticleByTitle(titleText) {
        return this.page.getByText(titleText);
    }
}