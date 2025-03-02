import { init, id } from "@instantdb/admin";
import puppeteer from "puppeteer";

const db = init({
  appId: "d61474bf-3716-48ff-a937-160d78848b7f",
  adminToken:,
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

for (const k in subjects) {
  const courseUrl = `https://vancouver.calendar.ubc.ca/course-descriptions/subject/${subjects[k].toLowerCase()}v`;

  await page.goto(courseUrl);

  const items = await page.$$("li > article > div > h3");
  const descp = await page.$$("li > article > div > p");

  for (let i = 0; i < items.length; i++) {
    const text = await page.evaluate((element) => element.innerText, items[i]);
    const text2 = await page.evaluate((element) => element.innerText, descp[i]);

    const subj = text.substring(0, 4);
    const cod = text.substring(7, 10);
    const nme = text.split(")")[1];
    const crd = text.split("(")[1].substring(0, 1);
    const des = text2
      .replace(/\[[^\]]*\]/g, "")
      .replace(/[^.?!]*This course is not eligible for[^.?!]*[.?!]\s*/gi, "");

    const data = await db.query({
      courses: {
        $: {
          where: {
            and: [
              { subject: { $ilike: `${subj}%` } },
              { code: { $ilike: `${cod}%` } },
              { credits: { $ilike: `${crd}%` } },
            ],
          },
        },
      },
    });

    if (!data.courses[0]) {
      await db.transact([
        db.tx.courses[id()].update({
          subject: subj,
          code: cod,
          credits: crd,
          name: nme,
          description: des,
        }),
      ]);
    } else {
      const iden = data.courses[0].id;

      await db.transact([
        db.tx.courses[iden].update({
          description: des,
        }),
      ]);
    }
  }
}

await browser.close();
