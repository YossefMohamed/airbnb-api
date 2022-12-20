import { NextFunction, Request, Response } from "express";
import Property from "../models/propertyModel";
import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

export const getProperties = async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.page) || 1;
  const propertyType = req.query.type || "sell";
  const { lat, long, maxd = Math.abs(Math.max()) } = req.query;
  const priceFrom = Number(req.query.pf) || 0;
  const priceTo = Number(req.query.pt) || Math.abs(Math.max());
  const pages: any = Math.ceil(
    Number(
      (
        await Property.aggregate([
          {
            $match: {
              price: { $gte: priceFrom, $lte: priceTo },
              type: propertyType,
            },
          },
          {
            $group: {
              _id: null,
              docs: { $sum: 1 },
            },
          },
        ])
      )[0]?.docs
    ) / 2
  );

  if (pageNumber > pages || pageNumber < 1) {
    return res.status(200).json({
      status: "ok",
      metaData: {
        pages,
        currentPage: pageNumber,
      },
      data: [],
    });
  }
  let properties;
  if (lat && long) {
    properties = await Property.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [Number(long), Number(lat)] },
          distanceField: "distance",
          maxDistance: Number(maxd),
          spherical: true,
        },
      },
      {
        $match: {
          price: { $gte: priceFrom, $lte: priceTo },
          type: propertyType,
        },
      },
      {
        $sort: { price: 1 },
      },
      { $skip: (pageNumber - 1) * 2 },
      { $limit: 2 },
      {
        $match: {
          price: { $gte: priceFrom, $lte: priceTo },
          type: propertyType,
        },
      },
    ]);
  } else {
    properties = await Property.aggregate([
      {
        $match: {
          price: { $gte: priceFrom, $lte: priceTo },
          type: propertyType,
        },
      },
      {
        $sort: { price: 1 },
      },
      { $skip: (pageNumber - 1) * 2 },
      { $limit: 2 },
      {
        $match: {
          price: { $gte: priceFrom, $lte: priceTo },
          type: propertyType,
        },
      },
    ]);
  }
  return res.status(200).json({
    status: "ok",
    metaData: {
      pages,
      currentPage: pageNumber,
    },
    data: properties,
  });
};

export const postProperty = async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    geolocation,
    width,
    height,
    type,
    propertyType,
  } = req.body;

  const home = await Property.create({
    name,
    price,
    description,
    area: {
      height,
      width,
    },
    type,
    propertyType,
    geolocation,
    owner: req.user._id,
  });

  res.status(201).json({
    status: "ok",
    data: home,
  });
};

export const postImagesToProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const property = await Property.findById(new mongoose.Types.ObjectId(id));

  if (
    !property ||
    !req.files!.length ||
    !property.owner._id.equals(req.user._id)
  ) {
    return next(new NotFoundError());
  }

  const filenames = req.files! as Array<Express.Multer.File>;
  const file_names = filenames.map(
    (file: { filename: string }) => file.filename
  );
  property.propertyImages = file_names;
  property.save();
  res.status(200).json({
    status: "ok",
    data: property,
  });
};

export const getProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await Property.findById(new mongoose.Types.ObjectId(id));
  res.status(200).json({
    status: "ok",
    data: property,
  });
};

export const deleteProperty = async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await Property.findById(new mongoose.Types.ObjectId(id));
  if (property && req.user._id.equals(property.owner._id)) {
    if (property.deleted === true)
      res.status(400).json({
        status: "failed",
        message: "Already Deleted",
      });
    else {
      property.deleted = true;
      await property.save();
      res.status(204).json({
        status: "ok",
        data: property,
      });
    }
  }
  throw new NotFoundError("Property Not Found");
};

export const editProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, description, geolocation, type, propertyType } =
    req.body;
  const { id } = req.params;
  const property = await Property.findById(new mongoose.Types.ObjectId(id));

  if (property && property.owner.equals(req.user._id)) {
    property.price = price || property.price;
    property.name = name || property.name;
    property.description = description || property.description;
    property.geolocation = geolocation || property.geolocation;
    property.type = type || property.type;
    property.propertyType = propertyType || property.propertyType;
    await property.save();
    res.status(201).json({
      status: "ok",
      data: property,
    });
  } else {
    next(new NotFoundError("Property Not Found"));
  }
};
