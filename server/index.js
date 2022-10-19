"use strict";

// Define a server port
const PORT = 3001;

// Midllewares import
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Passport-related imports
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
// init express
const app = new express();

// Set up and use some middlewares
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(
	session({
		secret: "shhhhh... it's a secret!",
		resave: false,
		cookie: { maxAge: 24 * 60 * 60 * 1000 },
		saveUninitialized: false,
	})
);

// Router in /routes/app-router.js
const router = require("./routes/app-router");
app.use("/api", router);

// activate the server
app.listen(PORT, async () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

app.get("/api/callcustomer/:customerid/:serviceType", async (req, res) => {
	const id = req.params.customerid;
	const type = req.params.Servicetype;
	try {
		const call = await nextcall(id, type);
		return res.status(201).json(call);
	} catch (error) {
		return res.status(500).json({ error: "Generic Error" });
	}
});
// Passport: set up local strategy
passport.use(
	new LocalStrategy(async function verify(username, password, cb) {
		const user = await user.loginUser(username, password);
		if (!user) return cb(null, false, "Incorrect username or password.");

		return cb(null, user);
	})
);

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (user, cb) {
	// this user is id + email + name
	return cb(null, user);
	// if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

/*Function used to check if user is logged in */
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ error: "Not authorized" });
};

app.use(
	session({
		secret: "shhhhh... it's a secret!",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.authenticate("session"));

/* If we aren't interested in sending error messages... */
app.post("/sessions", passport.authenticate("local"), (req, res) => {
	res.status(201).json(req.user);
});

// GET /sessions/current
app.get("/sessions/current", (req, res) => {
	if (req.isAuthenticated()) {
		res.json(req.user);
	} else res.status(401).json({ error: "Not authenticated" });
});

// DELETE /sessions/current
app.delete("/sessions/current", (req, res) => {
	req.logout(() => {
		res.end();
	});
});
