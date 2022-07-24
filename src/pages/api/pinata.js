// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useEffect, useState } from "react";

//To Do: Fix this endPoint for the 401 error res. 
export const sendFilePinata = async (indexFile) => {
  e.preventDefault();


  // const sendFileToIPFS = async (e) => {
  //   e.preventDefault();

  //   if (indexFile) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", indexFile);

  //       const resFile = await axios({
  //         method: "POST",
  //         url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //         data: formData,
  //         headers: {
  //           pinata_api_key: `${process.env.NEXT_PINATA_API_KEY}`,
  //           pinata_secret_api_key: `${process.env.NEXT_PINATA_SECRET_API_KEY}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });
  //       console.log("resFile ReS", resFile);

  //       const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
  //       console.log(ImgHash);
  //       //Take a look at your Pinata Pinned section, you will see a new file added to you list.
  //     } catch (error) {
  //       console.log("Error sending File to IPFS: ", error);
  //     }
  //   }
  // };

  if (indexFile) {
    try {
      const formData = new FormData();
      formData.append("file", indexFile);

      // Display the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      console.log(...formData);

      //   console.log("formData", indexFile);

      //   const resFile = await axios({
      //     method: "post",
      //     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //     data: formData,
      //     headers: {
      //       pinata_api_key: `${process.env.NEXT_PINATA_API_KEY}`,
      //       pinata_secret_api_key: `${process.env.NEXT_PINATA_SECRET_API_KEY}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });

      //   const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      //   console.log(ImgHash);
      //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};
