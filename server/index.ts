import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (_req, res) => res.send("Muse Maker API running!"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});