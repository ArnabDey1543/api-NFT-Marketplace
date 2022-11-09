const fs = require("fs");

const express = require("express");


const nfts = JSON.parse(
    fs.readFileSync(`${__dirname}/../nft-data/data/nft-sample.json`)
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
  };
  
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
      }
    );
  };
  
  // GET SINGLE NFT
  const getSingleNFT = (req, res) => {
    const id = req.params.id * 1;
    const nft = nfts.find((el) => (el.id = id));
  
    if (!nft) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        nft,
      },
    });
  };
  
  // PATCH METHOD
  const updateNFT = (req, res) => {
    if (req.params.id * 1 > nfts.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        nft: "Updating nft",
      },
    });
  };
  
  // DELETE METHOD
  const deleteNFT = (req, res) => {
    if (req.params.id * 1 > nfts.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  };
  

const router = express.Router();


//  ROUTER NFTs
router.route("/").get(getAllNfts).post(createNFT);
router.route("/:id").get(getSingleNFT).patch(updateNFT).delete(deleteNFT);



module.exports = router;