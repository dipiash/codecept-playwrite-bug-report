import LocatorOrString = CodeceptJS.LocatorOrString

const { I } = inject()

export class BasePage {
  static BASE_URL = '#BASE_URL'

  /**
   * Open pane on BASE_URL
   */
  static async open(): Promise<void> {
    I.amOnPage(this.BASE_URL)
  }

  /**
   * Check that the element exist on page
   *
   * @param {LocatorOrString} selector - Локатор
   */
  static isVisible(selector: LocatorOrString): void {
    I.seeElement(selector)
  }

  /**
   * Check that the element not exist on page
   *
   * @param {LocatorOrString} selector - Локатор
   */
  static isNotVisible(selector: LocatorOrString): void {
    I.dontSeeElement(selector)
  }

  /**
   * Click on the element
   *
   * @param {LocatorOrString} selector - Локатор
   */
  static async clickOn(selector: LocatorOrString): Promise<void> {
    I.seeElement(selector)
    I.click(selector)
  }
}
