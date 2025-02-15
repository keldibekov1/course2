import express from "express";
import database from "./config/db.js";

import authRouter from "./routes/auth.js";
import setupSwagger from "./config/swagger.js";
import multerRoute from "./routes/multer.routes.js";
import mainRoute from "./routes/index.js";


let PORT = process.env.PORT || 3001;
let app = express();

app.use(express.json());


app.use("/auth", authRouter);
app.use("/api", mainRoute)
app.use("/img", multerRoute);

setupSwagger(app);

async function bootstaprt() {
  try {
    await database.sync(
    //  { force: true }
      
    );
    console.log("Connect to db");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
bootstaprt();
