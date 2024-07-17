interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

interface Guest {
  adult: number;
  child: number;
}

interface Allocation extends Guest {
  price: number | undefined;
}

const getDefaultRoomAllocation: (
  guest: Guest,
  rooms: Room[]
) => Allocation[] = (guest, rooms) => {
  return [];
};

export default getDefaultRoomAllocation;

export const getRoomPrice = (room: Room, allocation: Guest) => {
  if (allocation.adult === 0 && allocation.child === 0) return 0;
  return (
    room.roomPrice +
    room.adultPrice * allocation.adult +
    room.childPrice * allocation.child
  );
};

export const getTotalPrice = (rooms: Allocation[]) =>
  rooms.reduce((acc, val) => acc + (val.price ?? 0), 0);
