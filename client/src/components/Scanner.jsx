import React, { useState, useEffect } from "react";
import Html5QrcodePlugin from "../plugins/Html5QrcodePlugin";

const Scanner = ({ setScan }) => {
  const onNewScanResult = (decodedText, decodedResult) => {
    setScan(decodedText);
    console.log("VALUE:", decodedText, decodedResult);
  };

  return (
    <div className="mb-4">
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
};

export default Scanner;
