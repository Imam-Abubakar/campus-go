import React, { useState } from "react";
import Scanner from "../components/Scanner";
import RideHistoryList from "../components/RideHistoryList";
import RideModal from "../components/RideModal";

const Rides = () => {
  const [scanResult, setScanResult] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);

  const handleScan = (decodedText) => {
    setScanResult(decodedText);
  };

  const handleRideClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleCloseModal = () => {
    setSelectedRide(null);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12">
      <Scanner onScan={handleScan} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Ride History</h2>
      <RideHistoryList onRideClick={handleRideClick} />
      {selectedRide && (
        <RideModal ride={selectedRide} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Rides;
