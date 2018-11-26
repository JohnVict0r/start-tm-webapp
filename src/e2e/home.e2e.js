const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  beforeEach(async () => {
    await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'networkidle2' });

    // login
    await page.waitForSelector('#email', {
      timeout: 2000,
    });
    await page.type('#email', 'admin@example.org');
    await page.type('#password', 'secret');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#logo h1');
  });

  it('it should have logo text', async () => {
    await page.goto(BASE_URL);
    await page.waitForSelector('h1', {
      timeout: 5000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('h1')[0].innerText);
    expect(text).toContain('Produtiivo');
  });
});
