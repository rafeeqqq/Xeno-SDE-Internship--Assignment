const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db.js");

const customerRoutes = require("./routes/customerRoutes.js");
const campaignRoutes = require("./routes/campaignRoutes.js");
const communicationLogRoutes = require("./routes/communicationLogRoutes.js");
const audienceRoutes = require("./routes/audienceRoutes.js");
const authRoutes = require("./routes/authroutes.js");
const authenticateToken = require("./middleware/authMiddleware.js");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/customers", authenticateToken, customerRoutes);
app.use("/api/campaigns", authenticateToken, campaignRoutes);
app.use("/api/communicationLogs", authenticateToken, communicationLogRoutes);
app.use("/api/audience", authenticateToken, audienceRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}.`
  );
});
