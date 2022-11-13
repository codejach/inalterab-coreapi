import express from "express";
import cors from "cors";
import morgan from "morgan";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import i18backend from "i18next-fs-backend";
import * as setup from "./libs/initialSetup";
import { controller } from "./controllers/controller";
import access from "./routes/access.routes";
import action from "./routes/action.routes";
import auth from "./routes/auth.routes";
import home from "./routes/home.routes";
import permission from "./routes/permission.routes";
import user from "./routes/user.routes";
import utility from "./routes/utility.routes";

// Initialize express
const app = express();

// Initialize i18next
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(i18backend)
  .init({
    backend: {
      loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
    },
    debug: false,
    detection: {
      order: ["header", "querystring"],
    },
    preload: ["en", "es", "es_MX"],
    saveMissing: true,
    fallBackLng: ["en"],
  });

// Initial configuration
setup.initialConfiguration();

// Use cors
app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

// Configure morgan environment
app.use(morgan("dev"));

// Use i18next
app.use(i18nextMiddleware.handle(i18next));

// Read json request
app.use(express.json());

// Controller base
app.use(controller);

// Routes
app.use("/", home);
app.use("/", utility);
app.use("/auth", access);
app.use("/auth", action);
app.use("/auth", permission);
app.use("/auth", auth);
app.use("/user", user);

// Export default app
export default app;
