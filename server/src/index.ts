import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./lib/dbConnect";
import { compilerRouter } from "./routes/compilerRouter";
import { userRouter } from "./routes/userRouter";
import cookieParser from "cookie-parser";
const app = express();

const PORT= process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
// const corsOptions = {
//   origin: 'http://localhost:5173',
// };
const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
config();
require('dotenv').config()


app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

dbConnect();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});