import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import humanizeDuration from "humanize-duration";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  return humanizeDuration(seconds * 1000, {
    largest: 2,
    round: true,
    conjunction: " and ",
    serialComma: false,
  });
}
