import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import patientRoutes from "./routes/partient.routes.js";
import userInformationRoutes from "./routes/user_information.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ⚡ Configurar CORS
const corsOptions = {
  origin: ["http://localhost:5173", "https://cielp.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/cielp/v1/auth", authRoutes);
app.use("/api/cielp/v1/users", userRoutes);
app.use("/api/cielp/v1/patients", patientRoutes);
app.use("/api/cielp/v1/userInformation", userInformationRoutes);
app.use("/api/cielp/v1/services", servicesRoutes);

app.use("/welcome", (_, res) => {
  res.send("Bienvenido a CIELP API");
});

export default app;
