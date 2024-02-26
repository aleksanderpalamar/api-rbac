import mongoose, { Document, Schema } from "mongoose";

interface Permission {
  name: string;
  description: string;
}

interface Role {
  name: string;
  permissions: Permission[];
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

const RoleModel = mongoose.model<Role & Document>("Role", RoleSchema);

const PermissionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const PermissionModel = mongoose.model<Permission & Document>(
  "Permission",
  PermissionSchema
);

export { Role, Permission, RoleModel, PermissionModel };
