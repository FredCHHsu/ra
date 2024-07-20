"use client";
import {
  type ChangeEvent,
  type FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import getDefaultRoomAllocation, {
  type Guest,
  type Room,
  type Allocation,
  getRoomPrice,
} from "src/utils/getDefaultRoomAllocation";
import CustomInputNumber from "../CustomInputNumber";

import styles from "./styles.module.scss";

interface RoomAllocationProps {
  guest: Guest;
  rooms: Room[];
  onChange?: (result: Allocation[]) => void;
}

const RoomAllocation: FunctionComponent<RoomAllocationProps> = ({
  guest,
  rooms,
  onChange,
}) => {
  const [result, setResult] = useState<Allocation[]>(() =>
    getDefaultRoomAllocation(guest, rooms)
  );

  const onChangeAllocation = useCallback(
    (roomIdx: number, type: "adult" | "child") =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const nextResult = result.map((allocation, i) => ({
          ...allocation,
          ...(roomIdx === i
            ? {
                [type]: +e.target.value,
                price: getRoomPrice(rooms[i], {
                  ...allocation,
                  [type]: +e.target.value,
                }),
              }
            : []),
        }));
        setResult(nextResult);
        onChange(nextResult);
      },
    [onChange, result, rooms]
  );

  const remain: Guest = useMemo(
    () => ({
      adult: guest.adult - result.reduce((prev, curr) => prev + curr.adult, 0),
      child: guest.child - result.reduce((prev, curr) => prev + curr.child, 0),
    }),
    [guest.adult, guest.child, result]
  );

  return (
    <>
      <h3>{`住客人數： ${guest.adult} 位大人， ${guest.child} 位小孩 / ${rooms.length}房`}</h3>
      <div
        className={styles.banner}
      >{`尚未分配人數： ${remain.adult} 位大人， ${remain.child} 位小孩`}</div>
      {rooms.map((room, i) => {
        const total = result[i].adult + result[i].child;
        return (
          <div key={i} className={styles.roomRow}>
            <div>
              <h4
                className={styles.roomTitle}
              >{`房間： ${total}人 (${room.capacity})`}</h4>
            </div>
            <div className={styles.guestRow}>
              <div className={styles.guestType}>
                <div>大人</div>
                <div className={styles.note}>年齡 20+</div>
              </div>
              <CustomInputNumber
                name={`adult-${i}`}
                value={result[i].adult}
                onChange={onChangeAllocation(i, "adult")}
                min={0}
                max={room.capacity - result[i].child}
                disableSub={
                  result[i].adult <= 0 ||
                  (result[i].child > 0 && result[i].adult <= 1)
                }
                disableAdd={
                  result[i].adult >= room.capacity ||
                  total >= room.capacity ||
                  remain.adult <= 0
                }
              />
            </div>
            <div className={styles.guestRow}>
              <div className={styles.guestType}>
                <div>小孩</div>
              </div>
              <CustomInputNumber
                name={`child-${i}`}
                value={result[i].child}
                onChange={onChangeAllocation(i, "child")}
                min={0}
                max={room.capacity - result[i].adult}
                disableSub={result[i].child <= 0}
                disableAdd={
                  result[i].child >= room.capacity ||
                  total >= room.capacity ||
                  remain.child <= 0
                }
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RoomAllocation;
