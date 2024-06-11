import { Document, ObjectId } from "mongodb";
import { getDb } from "../mongodb";
import {
  TWishlist,
  TWishlistWithObjectId,
} from "@/validators/wishlist.validator";
import { DB_COLLECTION } from "@/types/app.type";

class Wishlist {
  static async getCollection() {
    const db = await getDb();
    return db.collection<TWishlistWithObjectId>(DB_COLLECTION.WISHLIST);
  }

  static async findAll() {
    const collection = await this.getCollection();

    return await collection.find().toArray();
  }

  static async findAllByUserId(id: string | ObjectId) {
    const userId =
      id instanceof ObjectId ? id : ObjectId.createFromHexString(id);
    const collection = await this.getCollection();

    const pipeline: Document[] = [
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    return await collection.aggregate(pipeline).toArray();
  }

  static async findById(id: string | ObjectId) {
    let _id = id instanceof ObjectId ? id : ObjectId.createFromHexString(id);

    const collection = await this.getCollection();

    return await collection.findOne({ _id });
  }

  static async create(data: TWishlist) {
    const collection = await this.getCollection();
    const { insertedId } = await collection.insertOne({
      productId: new ObjectId(data.productId),
      userId: new ObjectId(data.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.findById(insertedId);
  }

  static async delete(id: string) {
    const collection = await this.getCollection();
    const _id = new ObjectId(id);
    await collection.deleteOne({ _id });
  }
}

export default Wishlist;
