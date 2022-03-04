import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function getVersionFromAppStore(id: string) {
  if (!id) return '';

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

async function getVersionFromPlayStore(id: string) {
  if (!id) return '';

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

app.get('/', async (req, res) => {
  const { ios, android } = req.query;

  const iosVersion = await getVersionFromAppStore(String(ios || ''));
  const androidVersion = await getVersionFromPlayStore(String(android || ''));

  return res.json({
    ios: iosVersion,
    android: androidVersion,
  });
});

app.get('/android/:id', async (req, res) => {
  const { id } = req.params;
  const version = await getVersionFromPlayStore(id);

  return res.json({
    version,
  });
});

app.get('/ios/:id', async (req, res) => {
  const { id } = req.params;
  const version = await getVersionFromAppStore(id);

  return res.json({
    version,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`);
});
