import { NextFunction, Request, Response } from "express";
import Property from "../models/propertyModel";
import mongoose from "mongoose";
import { NotFoundError } from "../errors/not-found-error";

export const getProperties = async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.page) || 1;
  const pages: number = Math.ceil(Number(await Property.find().count()) / 2);

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
  const properties = await Property.aggregate([
    {
      $sort: { price: 1 },
    },
    { $skip: (pageNumber - 1) * 2 },
    { $limit: 2 },
  ]);
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
  console.log(
    property,
    req.files!.length,
    property?.owner._id.equals(req.user._id)
  );

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
      return res.status(400).json({
        status: "failed",
        message: "Already Deleted",
      });
    property.deleted = true;
    await property.save();
    return res.status(204).json({
      status: "ok",
      data: property,
    });
  }
};

export const editProperty = async (req: Request, res: Response) => {
  const { name, price, description, geolocation, type, propertyType } =
    req.body;
  const { id } = req.params;
  const property = await Property.findById(new mongoose.Types.ObjectId(id));

  if (property && property.owner._id.equals(req.user._id)) {
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
  }
};
