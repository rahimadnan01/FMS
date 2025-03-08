import { app } from "./app.js";
import { connect_db } from "./db/db.js";
const port = process.env.PORT || 8000;
connect_db()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to listen ${err}`);
  });