
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });


const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
)


mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
}).then((con) => {
    // console.log(con.connection);
    console.log("DB Connection Successfully");
})

//  console.log(app.get("env"));
// console.log(process.env);

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A NFT must have a name"],
        unique: true,
    },
    description: String,
    traitType: String,
    price: Number,
});

const NFT = mongoose.model("NFT", nftSchema);

const testNFT = new NFT({
    name: "The Insane Monkey",
    description: "abstract",
    traitType: "xyz",
    price: 657
})

testNFT.save().then(docNFT => {
    console.log(docNFT);
}).catch(error => {
    console.log("ERROR:", error);
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`);
});



