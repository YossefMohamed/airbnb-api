import { app } from "./app";
import { connectDB } from "./db";
import swaggerDocs from "./services/swagger";

connectDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
  swaggerDocs(app, Number(port));
});
