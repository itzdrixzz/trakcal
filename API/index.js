import { createClerkClient } from "@clerk/backend";
import "dotenv/config";
import express from "express";

const app = express();
const port = 3000;
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Trakcal API");
});

app.post("/clerk/webhooks/signup", async (req, res) => {
  const body = req.body;
  const userId = body.data.id;

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      hasCompletedOnboarding: false,
    },
  });

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      isPaid: false,
    },
  });

  console.log("Created metadata for ", userId, "succsesfully");
  res.send("Updated metadata for ", userId, "succsesfully: 200");
});

app.post("/clerk/update/metadata/completedonboarding", async (req, res) => {
  const body = req.body;
  const userId = body.id;

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      hasCompletedOnboarding: true,
    },
  });

  console.log("Updated metadata for ", userId, "succsesfully");
  res.send("Updated metadata for succsesfully: 200");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
