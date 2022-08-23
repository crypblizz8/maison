import React from "react";
import { useBundler } from "../state/BundlrContext";
import { useRef, useState } from "react";

const FileUploader = () => {
  const { balance, uploadFile } = useBundler();
  const [URI, setURI] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const hiddenFileInput = useRef(null);

  function onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImage(image);
      let reader = new FileReader();
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleUpload = async () => {
    const res = await uploadFile(file);
    console.log("res.data", res.data);
    setURI(`http://arweave.net/${res.data.id}`);
  };

  return (
    <>
      {balance && (
        <div className="flex flex-col mt-20 justify-center items-center w-full">
          <>
            <button onClick={handleClick} className="mb-4">
              {image ? "Change Selection" : "Select Image"}
            </button>
            <input
              accept="image/png, image/gif, image/jpeg"
              type="file"
              ref={hiddenFileInput}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </>

          {image && (
            <div
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              py={40}
              bgImage={`url('${image}')`}
              bgPosition="center"
              bgRepeat="no-repeat"
              mb={2}
            >
              <button
                className="bg-gray-200 rounded px-8 py-2 text-black hover:bg-gray-100"
                onClick={handleUpload}
              >
                Upload File
              </button>
            </div>
          )}

          {URI && (
            <p className="mt-4">
              <p fontSize="xl"> Uploaded File:</p>{" "}
              <a href={URI} target="_blank" rel="noreferrer">
                {URI}
              </a>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FileUploader;
