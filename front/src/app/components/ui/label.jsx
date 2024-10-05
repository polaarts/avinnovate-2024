"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "../../../lib/utils";

// Definición de variantes utilizando `cva`
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Componente Label sin anotaciones de tipo
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

// Asignación del nombre del componente para facilitar la depuración
Label.displayName = LabelPrimitive.Root.displayName || "Label";

export { Label };
