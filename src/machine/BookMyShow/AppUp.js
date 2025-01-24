import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation between screens
import "./SeatBooking.css";

const auditoriumData = [
  // JSON structure remains the same
  // Add your seat structure here
];

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState(() => {
    // Load reserved seats from localStorage on initial render
    const storedSeats = JSON.parse(localStorage.getItem("reservedSeats"));
    return storedSeats || [];
  });

  const navigate = useNavigate();

  // Reserve the selected seats for 2 minutes
  const reserveSeats = () => {
    const reservationEndTime = Date.now() + 2 * 60 * 1000; // 2 minutes
    const newReservedSeats = selectedSeats.map((seatId) => ({
      id: seatId,
      reservationEndTime,
    }));
    setReservedSeats((prev) => [...prev, ...newReservedSeats]);
    localStorage.setItem(
      "reservedSeats",
      JSON.stringify([...reservedSeats, ...newReservedSeats])
    );
  };

  // Handle seat selection
  const handleSeatClick = (id, availability) => {
    if (availability !== "AVAILABLE") return; // Only allow selection if seat is available
    setSelectedSeats(
      (prev) =>
        prev.includes(id)
          ? prev.filter((seatId) => seatId !== id) // Deselect seat
          : [...prev, id] // Select seat
    );
  };

  const isSelected = (id) => selectedSeats.includes(id);
  const isReserved = (id) =>
    reservedSeats.some(
      (reservedSeat) =>
        reservedSeat.id === id && Date.now() < reservedSeat.reservationEndTime
    );

  // Clean up expired reservations
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedReservations = reservedSeats.filter(
        (seat) => seat.reservationEndTime > now
      );
      setReservedSeats(updatedReservations);
      localStorage.setItem(
        "reservedSeats",
        JSON.stringify(updatedReservations)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [reservedSeats]);

  // Proceed to payment screen
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed.");
      return;
    }
    reserveSeats(); // Reserve selected seats
    setSelectedSeats([]); // Clear selected seats (optional)
    navigate("/payment"); // Navigate to the payment screen
  };

  return (
    <div className="auditorium">
      {auditoriumData.map((tier) => (
        <div key={tier.category} className="tier">
          <h2>
            {tier.category} - ₹{tier.price}
          </h2>
          {tier.rows.map((row) => (
            <div key={row.rowNumber} className="row">
              <span className="rowName">{row.rowNumber}</span>
              {row.seats.map((seat) => {
                if (seat.availability === "NO_SEAT") {
                  return <span key={seat.id} className="seat space"></span>;
                }
                return (
                  <span
                    key={seat.id}
                    className={`seat ${
                      isReserved(seat.id)
                        ? "reserved"
                        : seat.availability === "BOOKED"
                        ? "booked"
                        : seat.availability === "BLOCKED"
                        ? "blocked"
                        : isSelected(seat.id)
                        ? "selected"
                        : "available"
                    }`}
                    onClick={() => handleSeatClick(seat.id, seat.availability)}
                  >
                    {seat.seatNumber}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      ))}
      <button className="proceedButton" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default SeatBooking;
