const express = require("express");
require("dotenv").config({ quiet: true });
const config = require("./config/config");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const { connectMongo } = require("./datasource/mongo.datasource");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
connectMongo();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({ origin: config.app.corsOrigins, credentials: true }));
app.use(express.json());

app.get("/status", (req, res) => {
  res.send("ok");
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});

module.exports = app;
