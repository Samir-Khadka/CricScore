const express = require("express");
const cors = require("cors");
const connectToMongoose = require("./services/db.js");

const homepageRoute = require("./routes/homeRoute.js");
const scorerRoute = require("./routes/scorerRoute.js");
const tournamentRoute = require("./routes/tournamentRoute.js");
const playersRoute = require("./routes/playersRoute.js");
const cookieParser = require("cookie-parser");
const checkAuthCookie = require("./middlewares/authenticate.js");
const Match=require('./routes/Match.js');
const matchRoute =require('./routes/matchRoute.js');

const app = express();

const PORT = process.env.PORT || 5000;

//for cors permission
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // allow cookies
  allowedHeaders: ["Content-Type"], // don't put 'credentials' here
};

//core middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// app.use("/api/chatgpt",OpenAI);
//public route - doesn't require auth cookie
app.use("/api/cricscore/scorer", scorerRoute);

//routes for viewer
app.use("/api/cricscore/view", homepageRoute);

//protected route-requires auth cookie
app.use(checkAuthCookie("token"));
app.use("/api/cricscore/tournament", tournamentRoute);



// app.use("/api/cricscore/match", matchRoute);
app.use("/api/cricscore/match", matchRoute);

app.use("/api/cricscore/players", playersRoute);
app.use("/api/cricscore/match",  matchRoute);




app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

connectToMongoose();
