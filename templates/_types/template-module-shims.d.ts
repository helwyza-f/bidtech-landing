declare module "framer-motion" {
  import type { ComponentType, ReactNode } from "react";

  export type Variants = Record<string, unknown>;

  type MotionComponent = ComponentType<Record<string, any>>;

  export const motion: Record<string, MotionComponent>;
  export const AnimatePresence: ComponentType<{ children?: ReactNode; mode?: string } & Record<string, unknown>>;
  export function useScroll(...args: unknown[]): Record<string, any>;
  export function useTransform(...args: unknown[]): any;
}

declare module "@base-ui/react/button" {
  import type { ButtonHTMLAttributes, ComponentType } from "react";

  export namespace Button {
    export type Props = ButtonHTMLAttributes<HTMLButtonElement> & Record<string, unknown>;
  }

  export const Button: ComponentType<Button.Props>;
}
