import mongoose, { Schema, Document } from "mongoose";
import { Role } from "./models";

interface User extends Document {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;