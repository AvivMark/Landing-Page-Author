# פריסה ב-GitHub Pages

## הפעלת האתר

1. היכנסי ל־**GitHub** → הפרויקט **Landing-Page-Author**
2. **Settings** → בתפריט הצד **Pages**
3. תחת **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / **(root)**
4. שמירה — אחרי דקה־שתיים האתר יהיה זמין בכתובת:
   **https://avivmark.github.io/Landing-Page-Author/**

## עדכון האתר

אחרי שינויים בקוד, דחיפה ל-GitHub מעדכנת את האתר אוטומטית:

```bash
cd "C:\Users\Aviv\gitprojects\landing-page\Landing-Page-Author"
git add .
git commit -m "Update site"
git push origin main
```

## הערות

- הקובץ `.nojekyll` מבטיח ש-GitHub לא יטפל באתר עם Jekyll (מתאים לאתר סטטי רגיל).
- אם תשני את שם הרפו או את שם המשתמש ב-GitHub, הכתובת תשתנה בהתאם.
