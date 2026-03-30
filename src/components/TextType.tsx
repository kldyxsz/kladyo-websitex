'use client';

import {
  ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  cursorClassName = '',
  text,
  as: Tag = 'span',
  typingSpeed = 100,
  initialDelay = 0,
  pauseDuration = 1500,
  deletingSpeed = 50,
  loop = true,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
}: TextTypeProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStarted, setIsStarted] = useState(!startOnVisible && !initialDelay);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const texts = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Initial delay
  useEffect(() => {
    if (!initialDelay) return;
    const t = setTimeout(() => setIsStarted(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  // Start on visible
  useEffect(() => {
    if (!startOnVisible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Cursor blink via GSAP
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
    return () => { tween.kill(); };
  }, [showCursor, cursorBlinkDuration]);

  // Hide cursor while typing
  useEffect(() => {
    if (!hideCursorWhileTyping || !cursorRef.current) return;
    gsap.set(cursorRef.current, { opacity: isDeleting ? 1 : 0 });
  }, [displayText, hideCursorWhileTyping, isDeleting]);

  const getSpeed = useCallback(() => {
    if (variableSpeed) {
      return (
        Math.random() * (variableSpeed.max - variableSpeed.min) +
        variableSpeed.min
      );
    }
    return isDeleting ? deletingSpeed : typingSpeed;
  }, [isDeleting, deletingSpeed, typingSpeed, variableSpeed]);

  useEffect(() => {
    if (!isStarted) return;
    const currentText = texts[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentText) {
      // Finished typing current sentence
      onSentenceComplete?.(currentText, currentIndex);
      if (texts.length === 1 && !reverseMode) return; // single static text
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      // Finished deleting
      setIsDeleting(false);
      if (loop || currentIndex < texts.length - 1) {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayText((prev) => prev.slice(0, -1)),
        getSpeed()
      );
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentText.slice(0, displayText.length + 1)),
        getSpeed()
      );
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    texts,
    isStarted,
    loop,
    pauseDuration,
    getSpeed,
    onSentenceComplete,
    reverseMode,
  ]);

  const currentColor =
    textColors.length > 0
      ? textColors[currentIndex % textColors.length]
      : undefined;

  return (
    <span
      ref={containerRef}
      className={className}
      style={currentColor ? { color: currentColor } : undefined}
    >
      {createElement(Tag, {}, displayText)}
      {showCursor && (
        <span ref={cursorRef} className={cursorClassName} aria-hidden>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
