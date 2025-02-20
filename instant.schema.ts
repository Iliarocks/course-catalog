import { i } from "@instantdb/react";

const _schema = i.schema({
  // We inferred 2 attributes!
  // Take a look at this schema, and if everything looks good,
  // run `push schema` again to enforce the types.
  entities: {
    $files: i.entity({
      "content-disposition": i.string().indexed(),
      "content-type": i.string().indexed(),
      "key-version": i.number(),
      "location-id": i.string().unique().indexed(),
      path: i.string().unique().indexed(),
      size: i.number().indexed(),
      url: i.string(),
    }),
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    courses: i.entity({
      code: i.string().indexed(),
      credits: i.string(),
      name: i.string().indexed(),
      subject: i.string().indexed(),
    }),
  },
  // You can define links here.
  // For example, if `posts` should have many `comments`.
  // More in the docs:
  // https://www.instantdb.com/docs/modeling-data#3-links
  links: {},
  // If you use presence, you can define a room schema here
  // https://www.instantdb.com/docs/presence-and-topics#typesafety
  rooms: {},
});

// This helps Typescript display nicer intellisense
type AppSchema = typeof _schema;

const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
