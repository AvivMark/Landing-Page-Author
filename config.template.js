// ============================================================
//  תבנית הגדרות — נתונים רגישים מוזרקים מ-GitHub Secrets בפריסה
//  לפיתוח מקומי: העתיקו לקובץ config.js והחליפו את __PLACEHOLDER__ בערכים
//  ============================================================

const SITE_CONFIG = {

  siteTitle: "יוסיפיה פורת | סופרת",

  hero: {
    authorName: "יוסיפיה פורת",
    tagline: "סופרת ישראלית | מספרת את סיפור הארץ",
    quote: "״הסיפורים שלי הם חלונות אל ימים שעברו, אל ריחות האדמה ואל אנשים שבנו את הארץ הזו בידיים חשופות.״",
    authorImage: "images/author.png",
  },

  about: {
    heading: "אודות הסופרת",
    paragraphs: [
      "יוסיפיה פורת, תושבת קריית מוצקין, היא סופרת ישראלית שיצירותיה מספרות את סיפורה של ארץ ישראל בראשית דרכה.",
      "סיפוריה פורסמו ב-ynet, בכתב העת של אגודת הסופרים ״מאזניים״ ובכתבי עת נוספים. בספריה היא שוזרת זיכרונות אישיים עם תמונות היסטוריות מימי ההתיישבות, מלחמת העצמאות והשנים הראשונות של המדינה.",
      "הכתיבה שלה מתאפיינת בשפה עשירה, בתיאורים חושניים של הנוף הישראלי ובדמויות חיות שעולות מן הדפים ישירות אל הלב.",
    ],
  },

  // כריכות הספרים — קבצים מקומיים בתיקיית images/books/ (נתיבים יחסיים, עובדים ב-GitHub Pages)
  books: [
    { title: "סרטיפיקט לחיים", year: "2026", genre: "פרוזה", description: "סיפור חיים מרתק על המסע לארץ ישראל, על התקווה הגדולה שנשאו העולים בלבם ועל המציאות שחיכתה להם.", coverImage: "images/books/certificat-lechayim.jpg" },
    { title: "צל האזדרכת", year: "2016", genre: "פרוזה", description: "תחת צילו של עץ האזדרכת נפרשים סיפורי משפחה, זיכרונות ילדות וחיי שכונה בישראל של פעם.", coverImage: "images/books/zel-haazderech.jpg" },
    { title: "לראות בשדות זרים", year: "2012", genre: "פרוזה", description: "מבט עמוק על חיי ישראלים בין מולדת לגלות, בין שורשים למרחבים חדשים.", coverImage: "images/books/lirot-besdot-zarim.jpg" },
    { title: "הארונית הקסומה של סבתא", year: "2011", genre: "ספר ילדים ונוער", description: "סיפור קסום לילדים על סבתא, ארונית ישנה ושערים מפתיעים אל העבר.", coverImage: "images/books/aronit-kesuma.jpg" },
    { title: "פניצילין ועוד סיפורים", year: "2009", genre: "פרוזה", description: "אוסף סיפורים קצרים שמציירים את חיי היומיום בישראל בגוונים של הומור, געגוע ואנושיות.", coverImage: "images/books/penicilin.jpg" },
  ],

  cta: {
    heading: "רוצים לקרוא?",
    text: "הספרים זמינים לרכישה בחנויות הספרים המובילות ובפורמט דיגיטלי",
    buttons: [
      { label: "e-vrit | עברית", url: "https://www.e-vrit.co.il/Author/602/%D7%99%D7%95%D7%A1%D7%99%D7%A4%D7%99%D7%94_%D7%A4%D7%95%D7%A8%D7%AA" },
      { label: "הוצאת אוריון", url: "https://www.orion-books.co.il/product/manufacturer/89/%D7%99%D7%95%D7%A1%D7%99%D7%A4%D7%99%D7%94-%D7%A4%D7%95%D7%A8%D7%AA.aspx" },
    ],
  },

  contact: {
    heading: "יצירת קשר",
    email: "__CONTACT_EMAIL__",
    facebook: "__CONTACT_FACEBOOK__",
    instagram: "__CONTACT_INSTAGRAM__",
  },

  admin: {
    allowedEmails: __ALLOWED_EMAILS__,
    googleClientId: "__GOOGLE_CLIENT_ID__",
  },

  design: {
    primaryColor: "#B85C38",
    backgroundColor: "#F5F0E8",
    textColor: "#2C1810",
    secondaryColor: "#6B7B3A",
    accentColor: "#D4A853",
  },
};
