import { BasePage } from '../../shared/pages/BasePage'

const { I } = inject()

/**
 * Main Page
 *
 * URL: '/'
 */
export class MainPage extends BasePage {
  static BASE_URL = '/'

  static selectors = {
    loginButton: { xpath: "//a[@data-qa='Header-login']" },
  }

  static async mpLoaded(): Promise<void> {
    I.amOnPage(this.BASE_URL)

    return I.see('', this.selectors.loginButton)
  }
}
