export const generateSeatPreviewData = ({ seats = [] }: { seats: string[] }) => {
  const seatData = [];

  for (let id = 1; id <= 64; id++) {
    const seat = {
      id: id,
      status: seats.includes(id.toString()) ? "selected" : "taken",
    };

    seatData.push(seat);
  }

  return seatData;
}
