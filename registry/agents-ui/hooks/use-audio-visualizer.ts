"use client";

import { useEffect, useRef, useState } from "react";

export type AgentState = "connecting" | "initializing" | "listening" | "thinking" | "speaking" | "idle";

// Bar visualizer hook
function generateConnectingSequenceBar(columns: number): number[][] {
  const seq = [];
  for (let x = 0; x < columns; x++) {
    seq.push([x, columns - 1 - x]);
  }
  return seq;
}

function generateListeningSequenceBar(columns: number): number[][] {
  const center = Math.floor(columns / 2);
  return [[center], [-1]];
}

export function useAudioVisualizerBarAnimator(
  state: AgentState | undefined,
  columns: number,
  interval: number
): number[] {
  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<number[][]>([[]]);

  useEffect(() => {
    if (state === "thinking") {
      setSequence(generateListeningSequenceBar(columns));
    } else if (state === "connecting" || state === "initializing") {
      setSequence([...generateConnectingSequenceBar(columns)]);
    } else if (state === "listening") {
      setSequence(generateListeningSequenceBar(columns));
    } else if (state === undefined || state === "speaking") {
      setSequence([new Array(columns).fill(0).map((_, idx) => idx)]);
    } else {
      setSequence([[]]);
    }
    setIndex(0);
  }, [state, columns]);

  const animationFrameId = useRef<number | null>(null);
  useEffect(() => {
    let startTime = performance.now();
    const animate = (time: DOMHighResTimeStamp) => {
      const timeElapsed = time - startTime;
      if (timeElapsed >= interval) {
        setIndex((prev) => prev + 1);
        startTime = time;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [interval, columns, state, sequence.length]);

  return sequence[index % sequence.length] ?? [];
}

// Radial visualizer hook
function findGcdLessThan(columns: number, max: number = columns): number {
  function gcd(a: number, b: number): number {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
  for (let i = max; i >= 1; i--) {
    if (gcd(columns, i) === i) return i;
  }
  return 1;
}

function generateConnectingSequenceRadial(columns: number): number[][] {
  const seq = [];
  const center = Math.floor(columns / 2);
  for (let x = 0; x < columns; x++) {
    seq.push([x, (x + center) % columns]);
  }
  return seq;
}

function generateListeningSequenceRadial(columns: number): number[][] {
  const divisor = columns > 8 ? columns / findGcdLessThan(columns, 4) : findGcdLessThan(columns, 2);
  return Array.from({ length: divisor }, (_, idx) => [
    ...Array(Math.floor(columns / divisor))
      .fill(1)
      .map((_, idx2) => idx2 * divisor + idx),
  ]);
}

export function useAudioVisualizerRadialAnimator(
  state: AgentState | undefined,
  barCount: number,
  interval: number
): number[] {
  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<number[][]>([[]]);

  useEffect(() => {
    if (state === "thinking") {
      setSequence(generateListeningSequenceRadial(barCount));
    } else if (state === "connecting" || state === "initializing") {
      setSequence(generateConnectingSequenceRadial(barCount));
    } else if (state === "listening") {
      setSequence(generateListeningSequenceRadial(barCount));
    } else if (state === undefined || state === "speaking") {
      setSequence([new Array(barCount).fill(0).map((_, idx) => idx)]);
    } else {
      setSequence([[]]);
    }
    setIndex(0);
  }, [state, barCount]);

  const animationFrameId = useRef<number | null>(null);
  useEffect(() => {
    let startTime = performance.now();
    const animate = (time: DOMHighResTimeStamp) => {
      const timeElapsed = time - startTime;
      if (timeElapsed >= interval) {
        setIndex((prev) => prev + 1);
        startTime = time;
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [interval, barCount, state, sequence.length]);

  return sequence[index % sequence.length] ?? [];
}

// Grid visualizer hook
export interface Coordinate {
  x: number;
  y: number;
}

function generateConnectingSequenceGrid(rows: number, columns: number, radius: number): Coordinate[] {
  const seq = [];
  const centerY = Math.floor(rows / 2);
  const topLeft = {
    x: Math.max(0, centerY - radius),
    y: Math.max(0, centerY - radius),
  };
  const bottomRight = {
    x: columns - 1 - topLeft.x,
    y: Math.min(rows - 1, centerY + radius),
  };

  for (let x = topLeft.x; x <= bottomRight.x; x++) {
    seq.push({ x, y: topLeft.y });
  }
  for (let y = topLeft.y + 1; y <= bottomRight.y; y++) {
    seq.push({ x: bottomRight.x, y });
  }
  for (let x = bottomRight.x - 1; x >= topLeft.x; x--) {
    seq.push({ x, y: bottomRight.y });
  }
  for (let y = bottomRight.y - 1; y > topLeft.y; y--) {
    seq.push({ x: topLeft.x, y });
  }
  return seq;
}

function generateListeningSequenceGrid(rows: number, columns: number): Coordinate[] {
  const center = { x: Math.floor(columns / 2), y: Math.floor(rows / 2) };
  return [center, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }];
}

function generateThinkingSequenceGrid(rows: number, columns: number): Coordinate[] {
  const seq = [];
  const y = Math.floor(rows / 2);
  for (let x = 0; x < columns; x++) {
    seq.push({ x, y });
  }
  for (let x = columns - 1; x >= 0; x--) {
    seq.push({ x, y });
  }
  return seq;
}

export function useAudioVisualizerGridAnimator(
  state: AgentState,
  rows: number,
  columns: number,
  interval: number,
  radius?: number
): Coordinate {
  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<Coordinate[]>(() => [
    { x: Math.floor(columns / 2), y: Math.floor(rows / 2) },
  ]);

  useEffect(() => {
    const clampedRadius = radius
      ? Math.min(radius, Math.floor(Math.max(rows, columns) / 2))
      : Math.floor(Math.max(rows, columns) / 2);

    if (state === "thinking") {
      setSequence(generateThinkingSequenceGrid(rows, columns));
    } else if (state === "connecting" || state === "initializing") {
      setSequence([...generateConnectingSequenceGrid(rows, columns, clampedRadius)]);
    } else if (state === "listening") {
      setSequence(generateListeningSequenceGrid(rows, columns));
    } else {
      setSequence([{ x: Math.floor(columns / 2), y: Math.floor(rows / 2) }]);
    }
    setIndex(0);
  }, [state, rows, columns, radius]);

  useEffect(() => {
    if (state === "speaking") return;
    const indexInterval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(indexInterval);
  }, [interval, columns, rows, state, sequence.length]);

  return sequence[index % sequence.length] ?? { x: Math.floor(columns / 2), y: Math.floor(rows / 2) };
}
