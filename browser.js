
import puppeteer from 'puppeteer';

async function getBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--headless'],
  });

  return browser;
}

export { getBrowser };