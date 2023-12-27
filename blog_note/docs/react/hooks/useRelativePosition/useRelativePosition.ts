import { useEffect, useState, useMemo } from "react";


interface UseRelativePositionProps {
  target?: HTMLElement | null | undefined;
  onChange?: (position: UseRelativePositionResult) => void;
}
interface UseRelativePositionResult {
  top: number;
  left: number;
  bottom: number;
  right: number;

}

export const useRelativePosition = ({ target = document.body, onChange }: UseRelativePositionProps): UseRelativePositionResult => {

  console.log('target', target);

  const _target = useMemo(() => {
    console.log('target', target);

    return target ?? document.body
  }, [target])
  const [position, setPosition] = useState<UseRelativePositionResult>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  useEffect(() => {
    console.log(position)
    if (onChange) {
      onChange(position)
    }
  }, [position])

  const onMove = (event: MouseEvent) => {
    const targetRect = _target.getBoundingClientRect();
    // 计算鼠标相对于目标DOM元素的位置
    const mouseXRelativeToTarget = event.clientX - targetRect.left;
    const mouseYRelativeToTarget = event.clientY - targetRect.top;
    const newPosition = {
      top: mouseYRelativeToTarget,
      left: mouseXRelativeToTarget,
      bottom: targetRect.height - mouseYRelativeToTarget,
      right: targetRect.width - mouseXRelativeToTarget,
    }
    setPosition(newPosition)
  }

  useEffect(() => {
    _target.addEventListener("mousemove", onMove)
    return () => {
      _target.removeEventListener("mousemove", onMove)
    }
  }, [_target])

  return position
}
