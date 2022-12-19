import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";
import { IProperty } from "./propertyModel";
import { IUser } from "./userModel";

export interface IWishList extends Document {
  user: mongoose.PopulatedDoc<IUser>;
  property: mongoose.PopulatedDoc<IProperty>;
  type: string;
}

const wishListSchema: Schema<IWishList> = new mongoose.Schema<IWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    property: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Property",
    },
    type: {
      type: String,
      enum: ["saved", "contacted"],
      default: "saved",
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model<IWishList>("WishList", wishListSchema);
export default WishList;
