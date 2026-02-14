/**
 * One-time script: downloads book cover images to images/books/
 * so all images are local and work on GitHub Pages.
 * Run from project root: node scripts/download-book-covers.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const booksDir = path.join(__dirname, '..', 'images', 'books');
if (!fs.existsSync(booksDir)) {
  fs.mkdirSync(booksDir, { recursive: true });
}

const urls = [
  { file: 'certificat-lechayim.jpg', url: 'https://images-evrit.yit.co.il/Images/Products/NewBO/Products/38472/Image_life_Master.jpg' },
  { file: 'zel-haazderech.jpg', url: 'https://images-evrit.yit.co.il/Images/Products/newcovers/image_zel_master.jpg' },
  { file: 'lirot-besdot-zarim.jpg', url: 'https://images-evrit.yit.co.il/Images/Products/ebooks2/image_lirotbsdot_master.jpg' },
  { file: 'aronit-kesuma.jpg', url: 'https://images-evrit.yit.co.il/Images/Products/ebooks2/image_grandmas_magical_drawe_master.jpg' },
  { file: 'penicilin.jpg', url: 'https://images-evrit.yit.co.il/Images/Products/ebooks2/image_penicilin_master.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

(async () => {
  for (const { file, url } of urls) {
    const dest = path.join(booksDir, file);
    try {
      await download(url, dest);
      console.log('OK:', file);
    } catch (e) {
      console.error('Failed', file, e.message);
    }
  }
  console.log('Done. Commit the images/books/ folder.');
})();
