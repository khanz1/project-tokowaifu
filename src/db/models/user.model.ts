import { ObjectId, WithId } from "mongodb";
import { getDb } from "../mongodb";
import { TUser } from "@/validators/user.validator";
import { hashPassword } from "@/helpers/bcrypt";
import { DB_COLLECTION } from "@/types/app.type";

class User {
  static async getCollection() {
    const db = await getDb();
    return db.collection<TUser>(DB_COLLECTION.USER);
  }

  static async findById(id: string | ObjectId) {
    let _id = id instanceof ObjectId ? id : ObjectId.createFromHexString(id);

    const collection = await this.getCollection();

    return await collection.findOne({ _id });
  }

  static async findByEmail(email: string) {
    const collection = await this.getCollection();

    return await collection.findOne({
      email,
    });
  }

  static async create(data: TUser): Promise<WithId<TUser>> {
    const collection = await this.getCollection();
    data.password = hashPassword(data.password);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    const { insertedId } = await collection.insertOne(data);

    const user = await this.findById(insertedId);
    return user!;
  }
}

export default User;
