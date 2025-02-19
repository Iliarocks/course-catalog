import { init, id } from "@instantdb/admin";
import puppeteer from "puppeteer";

const db = init({
  appId: "d61474bf-3716-48ff-a937-160d78848b7f",
  adminToken: process.env.INSTANT_APP_ADMIN_TOKEN,
});

const browser = await puppeteer.launch();
const page = await browser.newPage();

page.setDefaultTimeout(0);

const subjectUrl =
  "https://vancouver.calendar.ubc.ca/course-descriptions/courses-subject";

await page.goto(subjectUrl);

const subjectItems = await page.$$(".list-buttons > li > a");
const subjects = [];

for (const subjectItem of subjectItems) {
  const subject = await page.evaluate((a) => a.innerText, subjectItem);
  subjects.push(subject.substring(0, 4));
}

for (const i in subjects) {
  const courseUrl = `https://vancouver.calendar.ubc.ca/course-descriptions/subject/${subjects[i].toLowerCase()}v`;

  await page.goto(courseUrl);

  const items = await page.$$("li > article > div > h3");

  for (const item of items) {
    const text = await page.evaluate((element) => element.innerText, item);

    await db.transact([
      db.tx.courses[id()].update({
        subject: text.substring(0, 4),
        code: parseInt(text.substring(6, 10)),
        name: text.split(")")[1],
        credits: text.split("(")[1].substring(0, 1),
      }),
    ]);
  }
}

await browser.close();
