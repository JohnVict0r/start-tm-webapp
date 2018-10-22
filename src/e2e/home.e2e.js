import puppeteer from 'puppeteer';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`, { waitUntil: 'networkidle2' });
    // await page.evaluate(() => window.localStorage.setItem('antd-pro-authority', 'guest'));

    // login
    await page.waitForSelector('#email', {
      timeout: 2000,
    });
    await page.type('#email', 'admin@example.org');
    await page.type('#password', 'secret');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#logo h1');
  });

  afterEach(() => page.close());

  it('it should have logo text', async () => {
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#logo h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>Produtiivo</h1>');
  });

  afterAll(() => browser.close());
});
