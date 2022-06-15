import useEventListener from "./useEventListener";

// 暫定 mouseEvent: 'mousedown'
const useClickoutside = <T extends HTMLElement = HTMLElement>({
  element,
  handler,
}: {
  element: React.RefObject<T>;
  handler: (e: MouseEvent) => void;
}) => {
  useEventListener({
    eventName: "click",
    handler: (e) => {
      if (element.current?.contains(e.target as Node)) return;
      handler(e);
    },
  });
};

export default useClickoutside;
