import findMinP from "./findMinP";

export interface Room {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number;
}

export interface Guest {
  adult: number;
  child: number;
}

export interface Price {
  price: number;
}

export type Allocation = Guest & {
  price?: number | undefined;
};

export const getRoomPrice = (room: Room, guest: Guest) => {
  if (guest.adult === 0 && guest.child === 0) return 0;
  return (
    room.roomPrice +
    room.adultPrice * guest.adult +
    room.childPrice * guest.child
  );
};

export const getTotalPrice = (rooms: Allocation[]) =>
  rooms.reduce((acc, val) => acc + (val.price ?? 0), 0);

const getDefaultRoomAllocation: (
  guest: Guest,
  rooms: Room[]
) => Allocation[] = (guest, rooms) => {
  const minimumPriceAndGuest = findMinP(
    rooms.map((room) => room.adultPrice),
    rooms.map((room) => room.childPrice),
    rooms.map((room) => room.roomPrice),
    rooms.map((room) => room.capacity),
    guest.adult,
    guest.child
  );

  return rooms.map((_, i) => ({
    adult: minimumPriceAndGuest.xValues[0]?.[i] || 0,
    child: minimumPriceAndGuest.yValues[0]?.[i] || 0,
    price: minimumPriceAndGuest.pValues[0]?.[i] || 0,
  }));
};

export default getDefaultRoomAllocation;
