import dotenv from "dotenv";
import * as path from "path";
const envPath = path.resolve(__dirname, "../../../../.env.development");
console.log(envPath);
dotenv.config({
  path: envPath,
});

import { client, getDb } from "../mongodb";
import users from "../data/users.json";
import { hashPassword } from "../../helpers/bcrypt";
import products from "../data/products.json";

const seed = async () => {
  try {
    const db = await getDb();

    // seeding user
    const collectionUser = db.collection("users");
    await collectionUser.drop();
    const newUsers = users.map((user) => {
      const hashedPassword = hashPassword(user.password);
      return {
        ...user,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await collectionUser.insertMany(newUsers);
    await collectionUser.createIndex({ email: 1 }, { unique: true });
    await collectionUser.createIndex({ username: 1 }, { unique: true });

    const insertedUsers = await collectionUser.find().toArray();
    console.log("Users seeded successfully");

    // seeding post
    const productCollection = db.collection("products");
    await productCollection.drop();

    const newProducts = [];
    for (const product of products) {
      // const newProduct: Partial<
      //   Record<
      //     keyof typeof product | "authorId" | "comments",
      //     string | ObjectId | any[]
      //   >
      // > = {};
      const newProduct: any = product;
      // const totalAuthor = insertedUsers.length;
      // randomize author
      // const randomizeIndexAuthor = Math.floor(Math.random() * totalAuthor);
      // newProduct.authorId = insertedUsers[randomizeIndexAuthor]._id;

      // post.comments.forEach((comment) => {
      //   // randomize comment but not same as author
      //   let randomizeIndexComment = Math.floor(Math.random() * totalAuthor);
      //   while (randomizeIndexComment === randomizeIndexAuthor) {
      //     randomizeIndexComment = Math.floor(Math.random() * totalAuthor);
      //   }
      //   comment.username = insertedUsers[randomizeIndexComment].username;
      //   comment.createdAt = new Date();
      //   comment.updatedAt = new Date();
      // });

      // post.likes.forEach((like) => {
      //   // randomize like but not same as author
      //   let randomizeIndexLike = Math.floor(Math.random() * totalAuthor);

      //   like.username = insertedUsers[randomizeIndexLike].username;
      //   like.createdAt = new Date();
      //   like.updatedAt = new Date();
      // });

      const createdAt = new Date();
      const randomDays = Math.floor(Math.random() * 30);
      createdAt.setDate(createdAt.getDate() - randomDays);

      newProduct.createdAt = createdAt;
      newProduct.updatedAt = new Date();
      newProducts.push(newProduct);
    }

    await productCollection.insertMany(newProducts);
    console.log("Products seeded successfully");

    // seeding follow
    const wishlistCollection = db.collection("wishlist");
    await wishlistCollection.drop();

    await wishlistCollection.insertMany([
      {
        userId: insertedUsers[0]._id,
        productId: insertedUsers[2]._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: insertedUsers[1]._id,
        productId: insertedUsers[2]._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: insertedUsers[1]._id,
        productId: insertedUsers[0]._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("Wishlist seeded successfully");
  } finally {
    if (client) {
      await client.close();
    }
  }
};

seed();
