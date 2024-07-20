import getDefaultRoomAllocation, {
  getRoomPrice,
  getTotalPrice,
} from "./getDefaultRoomAllocation";

const room1 = {
  roomPrice: 1000,
  adultPrice: 200,
  childPrice: 100,
  capacity: 4,
};
const room2 = { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 };
const room3 = { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 };

describe("calculate single room price", () => {
  test("no basic room price", () => {
    expect(
      getRoomPrice(
        { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
        { adult: 8, child: 0 }
      )
    ).toBe(0 + 8 * 500);
  });

  test("with basic room price", () => {
    expect(
      getRoomPrice(
        { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
        { adult: 2, child: 2 }
      )
    ).toBe(500 + 2 * 500 + 2 * 300);
  });

  test("0 when no guest", () => {
    expect(
      getRoomPrice(
        { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
        { adult: 0, child: 0 }
      )
    ).toBe(0);
  });
});

describe("get lowest price from room allocation", () => {
  test("example 1 - a", () => {
    const defaultRooms = getDefaultRoomAllocation({ adult: 4, child: 2 }, [
      room1,
      room2,
      room3,
    ]);
    expect(getTotalPrice(defaultRooms)).toBe(2500);
  });

  test("example 1 - b", () => {
    const defaultRooms = getDefaultRoomAllocation({ adult: 4, child: 0 }, [
      room1,
      room2,
      room3,
    ]);
    expect(getTotalPrice(defaultRooms)).toBe(500 + 4 * 300); // room 2
  });

  test("example 1 - c", () => {
    const defaultRooms = getDefaultRoomAllocation({ adult: 4, child: 0 }, [
      room1,
      room2,
      { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 3 },
    ]);
    expect(getTotalPrice(defaultRooms)).toBe(1000 + 4 * 200); // room 1
  });

  test("example 2", () => {
    const defaultRooms = getDefaultRoomAllocation({ adult: 16, child: 0 }, [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ]);
    expect(getTotalPrice(defaultRooms)).toBe(8500);
  });

  test("example 3", () => {
    const defaultRooms = getDefaultRoomAllocation({ adult: 0, child: 1 }, [
      { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
      { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ]);
    expect(getTotalPrice(defaultRooms)).toBe(0);
  });
});
