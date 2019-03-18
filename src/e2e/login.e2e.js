import defaultSettings from '../defaultSettings';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Login', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  beforeEach(async () => {
    await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle2' });
  });

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
    expect(text).toContain(`<h1>${defaultSettings.title}</h1>`);
  });
});
