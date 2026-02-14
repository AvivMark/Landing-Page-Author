# פריסה ב-GitHub Pages (עם Secrets)

הנתונים הרגישים (אימייל, פייסבוק, הרשאות עריכה) **לא** נשמרים ב-repo — הם מוזרקים מ-**GitHub Secrets** בזמן הפריסה.

---

## 1. הגדרת Secrets ב-GitHub

1. **GitHub** → הפרויקט **Landing-Page-Author** → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** — הוסיפי סוד לכל אחד מהשמות הבאים:

| שם הסוד (בדיוק) | תוכן | דוגמה |
|------------------|------|--------|
| `CONTACT_EMAIL` | אימייל ליצירת קשר | `yosifia015@gmail.com` |
| `CONTACT_FACEBOOK` | קישור לעמוד פייסבוק | `https://www.facebook.com/yosefa.porat/` |
| `CONTACT_INSTAGRAM` | קישור לאינסטגרם (או ריק) | `` או `https://instagram.com/...` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID (לעריכה באתר) | או השאירי ריק |
| `ALLOWED_EMAILS` | רשימת אימיילים מורשים לעריכה (JSON) | `["yosifia015@gmail.com"]` |

עבור `ALLOWED_EMAILS` יש להזין **מערך JSON**, למשל: `["email1@gmail.com","email2@gmail.com"]`

---

## 2. הפעלת פריסה מ-Actions

1. **Settings** → **Pages**
2. תחת **Build and deployment**:
   - **Source:** **GitHub Actions**
3. שמירה.

מעכשיו כל **push** ל-`main` מפעיל את ה-workflow: בניית `config.js` מה-Secrets ופריסת האתר.  
הכתובת: **https://avivmark.github.io/Landing-Page-Author/** (או לפי שם המשתמש/הרפו).

---

## 3. עדכון האתר

- **תוכן ציבורי** (טקסטים, ספרים, תמונות): עורכים ב-`config.template.js` ובדף, ואז:
  ```bash
  git add .
  git commit -m "Update content"
  git push origin main
  ```
- **נתונים רגישים** (אימייל, פייסבוק וכו'): מעדכנים רק ב-**Settings** → **Secrets and variables** → **Actions** — אין צורך לשנות קוד.

---

## 4. פיתוח מקומי

ב-repo יש רק `config.template.js` (עם placeholders). כדי להריץ את האתר אצלך במחשב:

1. העתיקי את התבנית:
   ```bash
   copy config.template.js config.js
   ```
2. פתחי את `config.js` והחליפי את הערכים:
   - `__CONTACT_EMAIL__` → האימייל האמיתי
   - `__CONTACT_FACEBOOK__` → קישור הפייסבוק
   - `__CONTACT_INSTAGRAM__` → קישור אינסטגרם או `""`
   - `__GOOGLE_CLIENT_ID__` → ה-Client ID או `YOUR_GOOGLE_CLIENT_ID_HERE`
   - `__ALLOWED_EMAILS__` → מערך JSON, למשל `["your@email.com"]`
3. הקובץ `config.js` לא נדחף ל-GitHub (הוא ב-.gitignore).

---

## 5. תמונות — כולן מקומיות

כל התמונות מפנות לקבצים **בתוך הפרויקט** כדי שיעבדו ב-GitHub Pages:

- **תמונת המחברת:** `images/author.png`
- **כריכות ספרים:** `images/books/*.jpg` — שמות הקבצים רשומים ב-`config.template.js` וב-`images/books/README.md`

אם הוספת ספר חדש, הוסיפי את קובץ הכריכה ל-`images/books/` ועדכני את `coverImage` ב-`config.template.js` לנתיב המקומי (למשל `images/books/name.jpg`).

---

## 6. אם ה-workflow נכשל

1. **Settings → Pages** — וודאי ש-**Source** הוא **GitHub Actions** (לא "Deploy from a branch"). רק כך נוצר ה-environment `github-pages` שה-deploy job צריך.
2. **Actions** → לחצי על הריצה שנכשלה → קראי את הודעת השגיאה:
   - **"config.template.js not found"** — וודאי שהקובץ `config.template.js` קיים ב-root של הפרויקט ונדחף ל-GitHub.
   - **"Environment github-pages not found"** — בחרי ב-Pages ב-Source: GitHub Actions ושמרי; אחרי דקה נסי שוב.
   - **"config.js was not generated"** — ייתכן שחסרים Secrets. הוסיפי לפחות `CONTACT_EMAIL` ו-`CONTACT_FACEBOOK` ב-Settings → Secrets and variables → Actions (אפשר להשאיר ריקים אם צריך).
3. אחרי תיקון — **push** נוסף ל-`main` מפעיל שוב את ה-workflow.
