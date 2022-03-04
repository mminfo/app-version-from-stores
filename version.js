async function getVersion(browser, url, selector, evaluateFn) {
  const page = await browser.newPage();

  try {
    await page.goto(url);
    return await page.evaluate(evaluateFn, selector);
  } catch (error) {
    console.error(error);
    return '';
  } finally {
    await page.close();
  }
}

async function getVersionFromAppStore(browser, id) {
  const url = `https://apps.apple.com/br/app/${id}`;
  const selector = '.whats-new__latest__version';
  const evaluateFn = (selector) =>
    document.querySelector(selector).innerText.split(' ')[1];

  return getVersion(browser, url, selector, evaluateFn);
}

async function getVersionFromPlayStore(browser, id) {
  const url = `https://play.google.com/store/apps/details?id=${id}`;
  const selector = '.htlgb .IQ1z0d .htlgb';
  const evaluateFn = (selector) =>
    document.querySelectorAll(selector)[3].innerText;

  return getVersion(browser, url, selector, evaluateFn);
}

export { getVersionFromAppStore, getVersionFromPlayStore, getVersion };