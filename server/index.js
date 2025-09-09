const express = require("express");
const { createServer } = require("http");

const cors = require("cors");
const connectToMongoose = require("./services/db.js");
const cookieParser = require("cookie-parser");
const checkAuthCookie = require("./middlewares/authenticate.js");

const homepageRoute = require("./routes/homeRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const tournamentRoute = require("./routes/tournamentRoute.js");
const playersRoute = require("./routes/playersRoute.js");
const matchRoute = require("./routes/matchRoute.js");
const userRoute = require("./routes/UserRouter.js");
const ballByballRoute = require("./routes/ballByBallRoute.js");

const app = express();
const httpServer = createServer(app);
const { Server } = require("socket.io")
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173","http://localhost:3000"]
  }
});

app.set("io", io);

// const PORT = process.env.PORT || 5000;
const PORT=5000;

//for cors permission
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:5000"], // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies
  allowedHeaders: ["Content-Type"], // don't put 'credentials' here
};

//core middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//public route - doesn't require auth cookie
app.use("/api/cricscore/scorer", scorerRoute);
app.use("/api/cricscore/user", userRoute);

//routes for viewer
app.use("/api/cricscore/view", homepageRoute);

//IMPORTANT: make it protected route later
app.use("/api/cricscore/ballByball", ballByballRoute);

//protected route-requires auth cookie
app.use(checkAuthCookie("token"));
app.use("/api/cricscore/tournament", tournamentRoute);
app.use("/api/cricscore/players", playersRoute);
app.use("/api/cricscore/match", matchRoute);

app.use("/api/cricscore/teams",playersRoute);

httpServer.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

connectToMongoose();
