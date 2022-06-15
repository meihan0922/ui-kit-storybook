import { useEffect, useRef } from "react";

// 專門省略addEventListener 跟removeEventListener用

// 必須限定eventName為WindowEvent|HTMLEvent，才能推倒handler的參數event為何
type WindowEvent = keyof WindowEventMap;
type HTMLEvent = keyof HTMLElementEventMap;

// 三個泛型
const useEventListener = <
  WE extends WindowEvent,
  HE extends HTMLEvent,
  T extends HTMLElement
>({
  eventName,
  handler,
  element,
}: {
  eventName: WE | HE;
  handler: (event: WindowEventMap[WE] | HTMLElementEventMap[HE]) => void;
  element?: React.RefObject<T>;
}) => {
  // 怕是handler會變化，造成不必要的useEffect，必需存起來
  const storeCallback = useRef(handler);
  // TODO: useLayoutEffect支援SSR
  useEffect(() => {
    storeCallback.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element?.current || window;
    if (!target?.addEventListener) return;
    const enentHandler = (e) => storeCallback.current(e);
    target.addEventListener(eventName, enentHandler);
    return () => target.removeEventListener(eventName, enentHandler);
  }, [eventName, element]);
};

export default useEventListener;
