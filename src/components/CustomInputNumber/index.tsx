"use client";
import {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import PlusIcon from "./PlusIcon";
import MinusIcon from "./MinusIcon";

import styles from "./styles.module.scss";

const triggerInputEvent: (arg0: HTMLInputElement, arg1: number) => void = (
  element,
  value
) => {
  if (!("__proto__" in element)) return;
  const desc = Object.getOwnPropertyDescriptor(element.__proto__, "value");

  desc?.set?.call(element, value);
  element.dispatchEvent(new InputEvent("input", { bubbles: true }));
};

interface CustomInputNumberProps {
  name: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  disableAdd?: boolean;
  disableSub?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLDivElement>) => void;
}

const CustomInputNumber: FunctionComponent<CustomInputNumberProps> = ({
  name,
  value,
  min,
  max,
  step,
  disabled,
  disableAdd,
  disableSub,
  onChange,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSub1 = useCallback(() => {
    if (disableSub) {
      return;
    }
    if (inputRef.current) {
      if (typeof min !== "undefined" && min >= +inputRef.current.value) {
        return;
      }
      triggerInputEvent(inputRef.current, +inputRef.current.value - 1);
    }
  }, [disableSub, min]);

  const handleAdd1 = useCallback(() => {
    if (disableAdd) {
      return;
    }
    if (inputRef.current) {
      if (typeof max !== "undefined" && +inputRef.current.value >= max) {
        return;
      }
      triggerInputEvent(inputRef.current, +inputRef.current.value + 1);
    }
  }, [disableAdd, max]);

  const [isPressing, setIsPressing] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startPressing = useCallback(
    (callback: () => void) => () => {
      setIsPressing(true);
      callback();

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(callback, 200);
      }, 1000);
    },
    []
  );

  const stopPressing = useCallback(() => {
    setIsPressing(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const disableSubButton = disableSub || disabled;
  const disableAddButton = disableAdd || disabled;

  return (
    <div className={styles.inputNumberBase} onBlur={onBlur}>
      <button
        className={clsx(styles.button, {
          [styles.disabled]: disableSubButton,
        })}
        onMouseDown={startPressing(handleSub1)}
        onMouseUp={stopPressing}
        onMouseLeave={stopPressing}
        disabled={disableSubButton}
      >
        <MinusIcon />
      </button>
      <input
        ref={inputRef}
        className={styles.input}
        type="number"
        onChange={onChange}
        name={name}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        value={value}
      />
      <button
        className={clsx(styles.button, {
          [styles.disabled]: disableAddButton,
        })}
        onMouseDown={startPressing(handleAdd1)}
        onMouseUp={stopPressing}
        onMouseLeave={stopPressing}
        disabled={disableAddButton}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default CustomInputNumber;
