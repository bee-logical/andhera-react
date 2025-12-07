import React from "react";
import Skeleton, { SkeletonProps } from "./skeleton";

export function SkeletonLines({
    lines = 3,
    spacing = 2,
    width = "100%",
    lastLineWidth = "70%",
    ...rest
  }: {
    lines?: number;
    spacing?: number;
    width?: string | number;
    lastLineWidth?: string | number;
  } & Omit<SkeletonProps, "variant">) {
    const arr = Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? lastLineWidth : width}
        height={rest.height ?? 12}
        className={i < lines - 1 ? `mb-${spacing}` : ""}
        {...rest}
      />
    ));
  
    return <div>{arr}</div>;
  }
  