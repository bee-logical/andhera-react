import type { MutableRefObject, Ref } from "react";

export function mergeRefs<T>(...refs: Array<Ref<T>>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(value);
      } else {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
