import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function getVersionFromAppStore(id) {
  try {
    const url = `https://apps.apple.com/br/app/id${id}`;
    const body = await axios.get(url).then((res) => res.data);
    const selector = 'whats-new__latest__version">Versão ';
    return body.split(selector)[1].split('</p>')[0];
  } catch (error) {
    console.log(error);
    return '';
  }
}

async function getVersionFromPlayStore(id) {
  try {
    const url = `https://play.google.com/store/apps/details?id=${id}`;
    const body = await axios.get(url).then((res) => res.data);
    const selector = '<div class="IQ1z0d"><span class="htlgb">';
    return body.split(selector)[4].split('</span>')[0];
  } catch (error) {
    console.log(error);
    return '';
  }
}

app.post('/', async (req, res) => {
  const { appStoreID, playStoreID } = req.body;

  const ios = await getVersionFromAppStore(appStoreID);
  const android = await getVersionFromPlayStore(playStoreID);

  return res.json({
    ios,
    android,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
