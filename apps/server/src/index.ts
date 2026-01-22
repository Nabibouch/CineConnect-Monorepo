import ENV from "./config/ENV.js";
import app from "./app.js";

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
