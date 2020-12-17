import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateToRoot(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateTo(ruta:string): Promise<unknown> {
    return browser.get(browser.baseUrl+ruta);
  }

  async navigateToLogin(): Promise<unknown> {
    return browser.get(browser.wait+'/login');
  }

  async navigateToMenuAdmin(): Promise<unknown> {
    return browser.get(browser.wait+'/menu-admin');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }

  async setEmailText(){
   return element(by.model('email')).sendKeys('Admin@gmail.com');
  }

  async getEmailText(): Promise<string> {
    return element(by.css('app-login #email')).getText();
  }

  async getDivGestionGradosMenuAdmin(): Promise<boolean> {
    return element(by.css('app-menu-admin #divGestionGrados')).isPresent();
  }
  
}
