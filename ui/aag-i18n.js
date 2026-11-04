// AAG DelaySend: the popup's own two-language dictionary (Hebrew / English)
// with a user-selectable language, independent of Thunderbird's UI locale.
// Elements opt in with data-i18n (textContent), data-i18n-value (value) or
// data-i18n-title (title). The choice is stored in browser.storage.local
// under "aagLang" and reused next time; the default is English.

const AAGI18N = {
  lang: "en",

  strings: {
    he: {
      subtitle: "שליחה מתוזמנת — ההודעה נשמרת בטיוטות ונשלחת כש־Thunderbird פתוח",
      whenToSend: "מתי לשלוח",
      chip15: "בעוד 15 דק׳",
      chip30: "בעוד 30 דק׳",
      chip1h: "בעוד שעה",
      chip2h: "בעוד שעתיים",
      chipTomorrow: "מחר 09:00",
      chipSunday: "יום א׳ 09:00",
      freetext: "זמן בטקסט חופשי (באנגלית, למשל tomorrow at 9am)",
      entervalid: "הזן תאריך תקף",
      scheduleTitle: "Ctrl+Enter / Enter",
      sendNow: "שלח כעת",
      placeInOutbox: "העבר לתיבת דואר יוצא",
      advanced: "חזרה על השליחה ואפשרויות נוספות",
      recurTitle: "חזרה על השליחה",
      once: "ללא (חד־פעמי)",
      minutely: "כל דקה",
      daily: "יומי",
      weekly: "שבועי",
      monthly: "חודשי",
      yearly: "שנתי",
      function: "פונקציה",
      funcHelp: "(הסבר על הפונקציה)",
      every: "כל",
      periodDays: "ימים",
      week1: "הראשון",
      week2: "השני",
      week3: "השלישי",
      week4: "הרביעי",
      week5: "החמישי",
      onSun: "ביום ראשון",
      onMon: "ביום שני",
      onTue: "ביום שלישי",
      onWed: "ביום רביעי",
      onThu: "ביום חמישי",
      onFri: "ביום שישי",
      onSat: "בשבת",
      ofEveryMonth: "של כל חודש",
      funcArgs: "ארגומנטים לפונקציה:",
      cancelOnReplyTitle: "הפסק את החזרה ברגע שמתקבלת תשובה להודעה",
      cancelOnReply: "בטל את החזרה כשמתקבלת תשובה",
      between: "רק בין השעות",
      onlyOn: "רק בימים",
      sun: "א׳",
      mon: "ב׳",
      tue: "ג׳",
      wed: "ד׳",
      thu: "ה׳",
      fri: "ו׳",
      sat: "ש׳",
      until: "עד לתאריך",
      saveDefaults: "שמור את הערכים כברירת מחדל",
      clearDefaults: "נקה ברירות מחדל",
      langTitle: "שפת החלון",
    },
    en: {
      subtitle: "Scheduled sending — the message waits in Drafts and goes out while Thunderbird is open",
      whenToSend: "When to send",
      chip15: "In 15 min",
      chip30: "In 30 min",
      chip1h: "In 1 hour",
      chip2h: "In 2 hours",
      chipTomorrow: "Tomorrow 09:00",
      chipSunday: "Sunday 09:00",
      freetext: "Free-text time (e.g. tomorrow at 9am)",
      entervalid: "Enter a valid date",
      scheduleTitle: "Ctrl+Enter / Enter",
      sendNow: "Send now",
      placeInOutbox: "Put in Outbox",
      advanced: "Repeat and more options",
      recurTitle: "Repeat",
      once: "None (one-time)",
      minutely: "Every minute",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
      function: "Function",
      funcHelp: "(about this function)",
      every: "Every",
      periodDays: "days",
      week1: "first",
      week2: "second",
      week3: "third",
      week4: "fourth",
      week5: "fifth",
      onSun: "Sunday",
      onMon: "Monday",
      onTue: "Tuesday",
      onWed: "Wednesday",
      onThu: "Thursday",
      onFri: "Friday",
      onSat: "Saturday",
      ofEveryMonth: "of every month",
      funcArgs: "Function arguments:",
      cancelOnReplyTitle: "Stop repeating as soon as a reply arrives",
      cancelOnReply: "Cancel repeat when a reply arrives",
      between: "Only between",
      onlyOn: "Only on",
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      until: "Until",
      saveDefaults: "Save these values as defaults",
      clearDefaults: "Clear defaults",
      langTitle: "Window language",
    },
  },

  t(key) {
    const table = AAGI18N.strings[AAGI18N.lang] || AAGI18N.strings.he;
    return table[key] !== undefined ? table[key] : AAGI18N.strings.he[key] || key;
  },

  // "in 5 minutes" / "בעוד 5 דקות" for the schedule button.
  relative(date) {
    const he = AAGI18N.lang === "he";
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    if (seconds < 60) {
      return he ? "בעוד פחות מדקה" : "in less than a minute";
    }
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      if (he) {
        return minutes === 1 ? "בעוד דקה" : minutes === 2 ? "בעוד שתי דקות" : `בעוד ${minutes} דקות`;
      }
      return minutes === 1 ? "in a minute" : `in ${minutes} minutes`;
    }
    const hours = Math.round(minutes / 60);
    if (hours < 24) {
      if (he) {
        return hours === 1 ? "בעוד שעה" : hours === 2 ? "בעוד שעתיים" : `בעוד ${hours} שעות`;
      }
      return hours === 1 ? "in an hour" : `in ${hours} hours`;
    }
    const days = Math.round(hours / 24);
    if (he) {
      return days === 1 ? "מחר" : days === 2 ? "בעוד יומיים" : `בעוד ${days} ימים`;
    }
    return days === 1 ? "tomorrow" : `in ${days} days`;
  },

  async init() {
    // English unless the user picked Hebrew before; the last choice is kept.
    const { aagLang } = await browser.storage.local.get({ aagLang: "en" });
    AAGI18N.lang = aagLang === "he" ? "he" : "en";
    AAGI18N.apply();
  },

  async setLang(lang) {
    AAGI18N.lang = lang === "he" ? "he" : "en";
    await browser.storage.local.set({ aagLang: AAGI18N.lang });
    AAGI18N.apply();
  },

  apply() {
    const rtl = AAGI18N.lang === "he";
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", AAGI18N.lang);
    document.body.style.direction = rtl ? "rtl" : "ltr";
    document.body.style.textAlign = rtl ? "right" : "left";
    for (const el of document.querySelectorAll("[data-i18n]")) {
      el.textContent = AAGI18N.t(el.dataset.i18n);
    }
    for (const el of document.querySelectorAll("[data-i18n-value]")) {
      el.value = AAGI18N.t(el.dataset.i18nValue);
    }
    for (const el of document.querySelectorAll("[data-i18n-title]")) {
      el.title = AAGI18N.t(el.dataset.i18nTitle);
    }
    const select = document.getElementById("aag-lang");
    if (select) {
      select.value = AAGI18N.lang;
    }
  },
};
