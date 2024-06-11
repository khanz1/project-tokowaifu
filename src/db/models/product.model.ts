import { Document, ObjectId } from "mongodb";
import { getDb } from "../mongodb";
import { DB_COLLECTION, FindAllOptions, TProduct } from "@/types/app.type";
import { COMMAND } from "@/constants";

class Product {
  static async getCollection() {
    const db = await getDb();
    return db.collection<TProduct>(DB_COLLECTION.PRODUCT);
  }

  static async findMostPopular(limit: number = 5) {
    const collection = await this.getCollection();

    return await collection
      .find()
      .sort({ salesCount: -1 })
      .limit(limit)
      .toArray();
  }

  static async findOneBySlug(slug: string) {
    const collection = await this.getCollection();

    return await collection.findOne({
      slug,
    });
  }

  static async findAll({ userId, search, page, command }: FindAllOptions) {
    const collection = await this.getCollection();
    const matchSearch: Document = {};
    let matchUserId: Document | null = null;

    if (search) {
      if (matchSearch["$match"]) {
        matchSearch["$match"].name = { $regex: search, $options: "i" };
      } else {
        matchSearch["$match"] = { name: { $regex: search, $options: "i" } };
      }
    }

    if (userId) {
      userId =
        userId instanceof ObjectId
          ? userId
          : ObjectId.createFromHexString(userId);

      matchUserId = {
        $match: {
          userId,
        },
      };
    }

    const pipeline: Document[] = [
      {
        $lookup: {
          from: "wishlist",
          localField: "_id",
          foreignField: "productId",
          as: "wishlist",
          ...(matchUserId && {
            pipeline: [matchUserId],
          }),
        },
      },
      {
        $unwind: {
          path: "$wishlist",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    if (userId && pipeline[0]["$lookup"]?.from === "wishlist") {
      userId =
        userId instanceof ObjectId
          ? userId
          : ObjectId.createFromHexString(userId);

      if (pipeline[0]["$lookup"]?.pipeline) {
        pipeline[0]["$lookup"].pipeline.userId = userId;
      } else {
        pipeline[0]["$lookup"].pipeline = { userId };
      }
    }

    if (Object.keys(matchSearch).length) {
      pipeline.unshift(matchSearch);
    }

    if (page) {
      const { number, size } = page;
      if (command !== COMMAND.REFETCH.toString()) {
        pipeline.push({ $skip: (number - 1) * size });
      }
      pipeline.push({ $limit: size });
    }

    console.log(JSON.stringify(pipeline, null, 2), ",<p");
    const totalCount = await collection.countDocuments(matchSearch?.['$match']);
    const products = await collection.aggregate(pipeline).toArray();
    const totalPages = Math.ceil(totalCount / page.size);

    return {
      data: products,
      totalPages,
      rowsPerPage: page.size,
      currentPage: page.number,
    };
  }

  static async findById(id: string | ObjectId) {
    let _id = id instanceof ObjectId ? id : ObjectId.createFromHexString(id);

    const collection = await this.getCollection();

    return await collection.findOne({ _id: _id });
  }

  static async create(data: TProduct) {
    const collection = await this.getCollection();
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const { insertedId } = await collection.insertOne(data);

    return this.findById(insertedId);
  }
}

export default Product;
