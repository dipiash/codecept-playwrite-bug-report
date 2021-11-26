import { MainPage } from '../../pages/main.page'

Feature('Main Page: Visit page')

Scenario('Visit page', async () => {
  await MainPage.mpLoaded()
}).tag('visit-page')
