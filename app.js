// const fs = require("fs")
// const express = require('express');
// const { json } = require("express");

// const app = express();
// app.use(express.json());

// // app.get('/',(req,res)=>{
// //     res.status(200).send("hello i am nft marketplace api")
// // });

// // app.get('/', (req, res) => {
// //     res
// //     .status(200)
// //     .json({
// //         message: "hello i am nft marketplace api",
// //         api: "NFT Marketplace",
// //     });
// // });
// // console.log(nfts);



// // GET REQUEST 

// const nfts = JSON.parse(
//     fs.readFileSync(`${__dirname}/nft-data/data/nft-sample.json`)
// );

// app.get('/api/v1/nfts', (req, res) => {
//     res.status(200).json({
//         status: "success",
//         results: nfts.length,
//         data: {
//             nfts,
//         },
//     });

// });


// // // POST REQUEST


// app.post("/api/v1/nfts", (req, res) => {
//     // console.log(req);
//     // console.log(req.body);

//     const newID = nfts[nfts.length - 1].id + 1;
//     const newNFTs = Object.assign({ id: newID }, req.body);

//     nfts.push(newNFTs);


//     fs.writeFile(
//         `${__dirname}/nft-data/data/nft-sample.json`,
//         JSON.stringify(nfts),
//         (err) => {
//             res.status(201).json({
//                 status: "success",
//                 nft: newNFTs,
//             });

//         });


//     // res.send("POST NFT");
// });



// // GET SINGLE NFT

// app.get("/api/v1/nfts/:id", (req, res) => {
//     // console.log(req.params);
//     const id = req.params.id * 1;
//     const nft = nfts.find((el) => el.id = id);

//     // if(id > nfts.length){
//     if(!nft){
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         data: {
//             nft,
//         }, 

//     });
// });


// // PATCH METHOD

// app.patch("/api/v1/nfts/:id", (req,res) => {


//     if(req.params.id*1 >nfts.length){
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         data: {
//              nft: "Updating nft"
//         }
//     });
// });


// // DELETE METHOD

// app.delete("/api/v1/nfts/:id", (req,res) => {


//     if(req.params.id*1 >nfts.length){
//         return res.status(404).json({
//             status: "fail",
//             message: "Invalid ID"
//         })
//     }
//     res.status(204).json({
//         status: "success",
//         data: null
//     });
// });


// const port = 3000;
// app.listen(port, () => {
//     console.log(`App running on port ${port}....`)
// });




/////// PART 2   ---------------------



const fs = require("fs")
const express = require('express');
const { json } = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));


//  CUSTOM Middle Ware
app.use((req,res,next)=>{
    console.log("hey i am from middleware funciton 👋")
    next();
})


app.use((req,ers,next) => {
    req.requestTime = new Date().toISOString();
    next();
});


// GET REQUEST 
const nfts = JSON.parse(
    fs.readFileSync(`${__dirname}/nft-data/data/nft-sample.json`)
);

const getAllNfts = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: "success",
        results: nfts.length,
        data: {
            nfts,
        },
    });
}



// // POST REQUEST
const createNFT = (req, res) => {

    const newID = nfts[nfts.length - 1].id + 1;
    const newNFTs = Object.assign({ id: newID }, req.body);

    nfts.push(newNFTs);

    fs.writeFile(
        `${__dirname}/nft-data/data/nft-sample.json`,
        JSON.stringify(nfts),
        (err) => {
            res.status(201).json({
                status: "success",
                nft: newNFTs,
            });

        });
}


// GET SINGLE NFT
const getSingleNFT = (req, res) => {
    const id = req.params.id * 1;
    const nft = nfts.find((el) => el.id = id);

    if (!nft) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            nft,
        },

    });
}


// PATCH METHOD
const updateNFT = (req, res) => {

    if (req.params.id * 1 > nfts.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            nft: "Updating nft"
        }
    });
}


// DELETE METHOD
const deleteNFT = (req, res) => {

    if (req.params.id * 1 > nfts.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    });
}



// app.get("/api/v1/nfts", getAllNfts);
// app.post("/api/v1/nfts", createNFT);
// app.get("/api/v1/nfts/:id", getSingleNFT);
// app.patch("/api/v1/nfts/:id", updateNFT);
// app.delete("/api/v1/nfts/:id", deleteNFT);

app.route("/api/v1/nfts").get(getAllNfts).post(createNFT);

app.route("/api/v1/nfts").get(getSingleNFT).patch(updateNFT).delete(deleteNFT);


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}....`)
});
