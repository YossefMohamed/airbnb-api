import mongoose, { Schema } from "mongoose";

export interface IProperty extends Document {
  name: String;
  price: String;
  _id: mongoose.Types.ObjectId;
  deleted: Boolean;
  description: string;
  rating: number;
  area: {
    width: number;
    height: number;
  };
  geolocation: {
    type: string;
    coordinates: [number];
  };
  type: string;
  owner: {
    _id: mongoose.Types.ObjectId;
    name: String;
    email: String;
  };
  propertyImages: string[];
  propertyType: string;
}

const propertySchema: Schema<IProperty> = new mongoose.Schema<IProperty>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["sell", "rent", "commercial"],
      default: "sell",
    },
    geolocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: [Number],
    },
    propertyType: {
      type: String,
      enum: ["apartment", "villa", "chalet", "roof"],
      default: "apartment",
    },
    area: {
      height: {
        type: Number,
        required: true,
      },
      width: {
        type: Number,
        required: true,
      },
    },
    price: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    propertyImages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      },
    },
  }
);

propertySchema.pre(/^find/, function (this, next) {
  this.populate("owner", {
    name: 1,
    _id: 1,
    email: 1,
  });
  next();
});
const Property = mongoose.model<IProperty>("Property", propertySchema);
export default Property;
