export class RegisterPage {
    constructor(page) {
        this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.singUpButton = page.getByRole('button', { name: 'Sign up' });
        this.emailErrorText = page.getByText('Email already exists.. try logging in');
    }

    async wrongRegister(user) {
        const { name , password } = user;
        await this.nameInput.fill(name);
        //hardcode
        await this.emailInput.fill('alina@a.a');
        await this.passwordInput.fill(password);
        await this.singUpButton.click();
    }

    async register(user) {
        const { name , email, password } = user;
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.singUpButton.click();
    }
}