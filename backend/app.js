import express from "express";
<<<<<<< HEAD
import morgan from "morgan";
=======
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import userRouter from "./routes/userRoutes.js";
<<<<<<< HEAD
import petRouter from "./routes/petRoutes.js";
import adoptionRouter from "./routes/adoptionRoutes.js";
=======
import rideRouter from "./routes/rideRoutes.js";
import requestRouter from "./routes/requestRoute.js";
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//Set security HTTP headers
app.use(helmet());

//Development Environment
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

//Body Parser
app.use(express.json({ limit: "10kb" }));

//Cookie parser
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    // whitelist: [
    //   "duration",
    //   "ratingsQuantity",
    //   "ratingsAverage",
    //   "maxGroupSize",
    //   "difficulty",
    //   "price",
    // ],
  })
);

//Serving static files
app.use("./images", express.static("images"));
// app.use(express.static(path.join(__dirname, "build")));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Limit requests from same IP
const limiter = rateLimit({
  max: 1000000000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//CORS Policy
<<<<<<< HEAD
app.use(
  cors({ credentials: true, origin: "https://fantasticpets.herokuapp.com" })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://fantasticpets.herokuapp.com"
  ); // update to match the domain you will make the request from
=======
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000"); // update to match the domain you will make the request from
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/api/v1/users", userRouter);
<<<<<<< HEAD
app.use("/api/v1/pets", petRouter);
app.use("/api/v1/adoptions", adoptionRouter);

=======
app.use("/api/v1/rides", rideRouter);
app.use("/api/v1/requests", requestRouter);
//
>>>>>>> 47875cd35ed09c27382313c30aa5f27652654807
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

export default app;
