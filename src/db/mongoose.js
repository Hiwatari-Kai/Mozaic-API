const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to database...')
  })
