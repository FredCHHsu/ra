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

export type Allocation = Room &
  Guest & {
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

export const getAllocations: (guest: Guest, rooms: Room[]) => Allocation[][] = (
  guest,
  rooms
) => {
  const range = guest.adult + guest.child;
  const groups = rooms.map((room) => room.capacity);

  const stringResults = new Set();
  const combine = (start: number, combs: Guest[]) => {
    if (
      combs.reduce((prev, curr) => prev + curr.adult + curr.child, 0) === range
    ) {
      stringResults.add(JSON.stringify([...combs]));
      return;
    }
    for (let i = start; i < range; i++) {
      const isChild = i >= guest.adult;
      for (let j = 0; j < groups.length; j++) {
        if (combs[j].adult + combs[j].child + 1 > groups[j]) {
          continue;
        }
        if (isChild) {
          if (combs[j].adult > 0) {
            combs[j].child += 1;
            combine(i + 1, combs);
            combs[j].child -= 1;
          }
        } else {
          combs[j].adult += 1;
          combine(i + 1, combs);
          combs[j].adult -= 1;
        }
      }
    }
  };
  combine(
    0,
    Array.from({ length: groups.length }, () => ({ adult: 0, child: 0 }))
  );

  const guestCombinationsArray: Guest[][] = Array.from(stringResults, (v) =>
    typeof v === "string" ? JSON.parse(v) : v
  );

  const allocationsArray = guestCombinationsArray.map((combinations) => {
    return combinations.map((combination, i) => ({
      ...rooms[i],
      ...combination,
      price: getRoomPrice(rooms[i], combination),
    }));
  });

  return allocationsArray;
};

export const getTotalPrice = (rooms: Allocation[]) =>
  rooms.reduce((acc, val) => acc + (val.price ?? 0), 0);

const getDefaultRoomAllocation: (
  guest: Guest,
  rooms: Room[]
) => Allocation[] = (guest, rooms) => {
  const allocations = getAllocations(guest, rooms);

  return (
    allocations
      .filter((allocation) => {
        return !allocation.every((room) => room.price === 0);
      })
      .sort((a, b) => getTotalPrice(a) - getTotalPrice(b))[0] ?? []
  );
};

export default getDefaultRoomAllocation;
