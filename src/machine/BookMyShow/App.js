import React, { useState } from "react";
import "./SeatBooking.css";

const auditoriumData = [
  {
    category: "Club",
    price: 800,
    rows: [
      {
        rowNumber: "A",
        seats: [
          { id: 1, seatNumber: "1", availability: "AVAILABLE" },
          { id: 2, seatNumber: "2", availability: "BOOKED" },
          { id: 3, seatNumber: "3", availability: "AVAILABLE" },
          { id: 4, seatNumber: null, availability: "NO_SEAT" },
          { id: 5, seatNumber: "5", availability: "BLOCKED" },
          { id: 6, seatNumber: "6", availability: "AVAILABLE" },
        ],
      },
      {
        rowNumber: "B",
        seats: [
          { id: 7, seatNumber: "1", availability: "BOOKED" },
          { id: 8, seatNumber: "2", availability: "AVAILABLE" },
          { id: 9, seatNumber: null, availability: "NO_SEAT" },
          { id: 10, seatNumber: "4", availability: "BLOCKED" },
          { id: 11, seatNumber: "5", availability: "AVAILABLE" },
        ],
      },
    ],
  },
  {
    category: "Executive",
    price: 500,
    rows: [
      {
        rowNumber: "C",
        seats: [
          { id: 12, seatNumber: "1", availability: "AVAILABLE" },
          { id: 13, seatNumber: null, availability: "NO_SEAT" },
          { id: 14, seatNumber: "3", availability: "BLOCKED" },
          { id: 15, seatNumber: "4", availability: "AVAILABLE" },
        ],
      },
    ],
  },
];

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

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
                      seat.availability === "BOOKED"
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
    </div>
  );
};

export default SeatBooking;
