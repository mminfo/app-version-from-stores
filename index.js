import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getBrowser } from './browser.js';
import { getVersionFromAppStore, getVersionFromPlayStore } from './version.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { appStoreID, playStoreID } = req.body;

  const browser = await getBrowser();
  const appStoreVersion = await getVersionFromAppStore(browser, appStoreID);
  const playStoreVersion = await getVersionFromPlayStore(browser, playStoreID);
  await browser.close();

  return res.json({
    appStoreVersion,
    playStoreVersion,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
