import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { corsOptions } from "./config/corsOptions.js";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/partient.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import spacesRoutes from "./routes/space.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Rutas

app.use("/api/cielp/v1/auth", authRoutes);
app.use("/api/cielp/v1/users", userRoutes);
app.use("/api/cielp/v1/patients", patientRoutes);
app.use("/api/cielp/v1/services", servicesRoutes);
app.use("/api/cielp/v1/spaces", spacesRoutes);

app.use("/cielp", (_, res) => {
  res.send("Bienvenido a CIELP API");
});

export default app;
