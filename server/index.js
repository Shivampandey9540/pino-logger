import app from "./app.js";

import dbConnect from "./db/index.js";

let PORT = process.env.PORT 
app.listen(PORT, async () => {
  await dbConnect();
  console.log("Server running at", PORT);
});
