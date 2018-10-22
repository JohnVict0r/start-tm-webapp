import puppeteer from 'puppeteer';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${BASE_URL}/user/login`, { waitUntil: 'networkidle2' });
  });

  afterEach(() => page.close());

  it('should login with failure', async () => {
    await page.waitForSelector('#email', {
      timeout: 2000,
    });
    await page.type('#email', 'mockuser@mail.com');
    await page.type('#password', 'wrong_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-alert-error'); // should display error
  });

  it('should login successfully', async () => {
    await page.waitForSelector('#email', {
      timeout: 2000,
    });
    await page.type('#email', 'admin@example.org');
    await page.type('#password', 'secret');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.ant-layout h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>Produtiivo</h1>');
  });

  afterAll(() => browser.close());
});
