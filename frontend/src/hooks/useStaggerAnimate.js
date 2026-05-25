import { useEffect, useRef } from 'react';
import { animate, stagger, set } from 'animejs';

export function useStaggerAnimate(childSelector, trigger, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const targets = ref.current.querySelectorAll(childSelector);
    if (!targets.length) return;

    set(targets, { opacity: 0, translateY: 24 });

    animate(targets, {
      opacity:    [0, 1],
      translateY: [24, 0],
      duration:   420,
      ease:       'outQuad',
      delay:      stagger(60, { start: 40 }),
      ...options,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return ref;
}
