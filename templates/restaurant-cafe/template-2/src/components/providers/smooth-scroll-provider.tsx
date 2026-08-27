"use client";

import React from "react";

export interface SmoothScrollProviderProps {
  children: React.ReactNode;
  smooth?: number;
  effects?: boolean;
  smoothTouch?: number | boolean;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return <>{children}</>;
}
