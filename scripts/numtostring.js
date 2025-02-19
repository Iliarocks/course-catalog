import { init } from "@instantdb/admin";

const db = init({
  appId: "d61474bf-3716-48ff-a937-160d78848b7f",
  adminToken: process.env.INSTANT_APP_ADMIN_TOKEN,
});

const data = await db.query({ courses: {} });

const courses = data.courses;

for (let i in courses) {
  await db.transact(
    db.tx.courses[courses[i].id].update({ code: courses[i].code.toString() }),
  );
}
