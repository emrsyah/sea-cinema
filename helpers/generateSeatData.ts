import { TicketType } from "@/types";

export const generateSeatData = ({
  bookedSeat = [],
}: {
  bookedSeat: TicketType[] | [];
}) => {
  const seatData = [];

  // Generate seat data for IDs 1 to 64
  for (let id = 1; id <= 64; id++) {
    const seat = {
      id: id,
      status: "available",
    };

    // Check if seat ID is taken based on the provided data
    for (const item of bookedSeat) {
      const seatIds = item.seat.map(Number);
      if (seatIds.includes(id)) {
        seat.status = "taken";
        break;
      }
    }

    seatData.push(seat);
  }

  return seatData;
};
