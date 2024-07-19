"use client";
import RoomAllocation from "src/components/RoomAllocation";

export default function Page() {
  return (
    <div style={{ width: 420, padding: 8 }}>
      <RoomAllocation
        guest={{ adult: 4, child: 2 }}
        rooms={[
          {
            roomPrice: 1000,
            adultPrice: 200,
            childPrice: 100,
            capacity: 4,
          },
          { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
          { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
        ]}
        onChange={(result) => console.log(result)}
      />
    </div>
  );
}
