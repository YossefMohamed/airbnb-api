import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.dbURI!, () => {
    console.log("connected");
  });
};

declare module "mongoose" {
  interface DocumentQuery<
    T,
    DocType extends import("mongoose").Document,
    QueryHelpers = {}
  > {
    mongooseCollection: {
      name: any;
    };
    cache(options: { key: string }): any;
    useCache: boolean;
    hashKey: string;
  }

  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType>
    extends DocumentQuery<any, any> {}
}

export { connectDB };
