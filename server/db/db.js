import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_DB, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
})
.then(() => {
    console.log('\x1b[32m%s\x1b[0m', "\nDatabase connection successful!");
})
.catch((e) => console.log(e.message))

const client = mongoose.connection;
client.on("error", (e) => console.log(e.message))
export default client;