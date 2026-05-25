import { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';

export function useEntranceAnimate(animations) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = createTimeline({ ease: 'outExpo' });

    animations.forEach(({ selector, offset, ...props }) => {
      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : ref.current;
      if (!targets || (targets.length !== undefined && !targets.length)) return;

      if (offset !== undefined) {
        tl.add(targets, props, offset);
      } else {
        tl.add(targets, props);
      }
    });

    return () => tl.pause();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
