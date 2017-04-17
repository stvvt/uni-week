import { UniWeekPage } from './app.po';

describe('uni-week App', () => {
  let page: UniWeekPage;

  beforeEach(() => {
    page = new UniWeekPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
