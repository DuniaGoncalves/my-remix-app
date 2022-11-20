import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";


// That's it for today! Here are some bits of homework to implement if you wanna go deeper:

// Update/Delete posts: make an /admin/$slug.tsx page for your posts. This should open an edit page for the post that allows you to update the post or even delete it. The links are already there in the sidebar but they return 404! Create a new route that reads the posts, and puts them into the fields. All the code you need is already in app/routes/posts/$slug.tsx and app/routes/posts/admin/new.tsx. You just gotta put it together.

// Optimistic UI: You know how when you favorite a tweet, the heart goes red instantly and if the tweet is deleted it reverts back to empty? That's Optimistic UI: assume the request will succeed, and render what the user will see if it does. So your homework is to make it so when you hit "Create" it renders the post in the left nav and renders the "Create a New Post" link (or if you add update/delete do it for those too). You'll find this ends up being easier than you think even if it takes you a second to arrive there (and if you've implemented this pattern in the past, you'll find Remix makes this much easier). Learn more from the Optimistic UI guide.

// Authenticated users only: Another cool bit of homework you could do is make it so only authenticated users can create posts. You've already got authentication all set up for you thanks to the Indie Stack. Tip, if you want to make it so you're the only one who can make posts, then simply check the user's email in your loaders and actions and if it's not yours redirect them somewhere 😈

// Customize the app: If you're happy with tailwind, keep it around, otherwise, check the styling guide to learn of other options. Remove the Notes model and routes, etc. Whatever you want to make this thing yours.

// Deploy the app: Check the README of your project. It has instructions you can follow to get your app deployed to Fly.io. Then you can actually start blogging!

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as unknown as LoaderData;  return (
    <main>
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}