import type { PropsWithChildren } from "react";
import type { Edge } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";

cssInterop(SafeAreaView, {
  className: "style",
});

type SafeAreaScreenProps = PropsWithChildren<{
  className?: string;
  edges?: Edge[];
}>;

const defaultEdges: Edge[] = [
  "top",
  "right",
  "bottom",
  "left",
];

export function SafeAreaScreen({
  children,
  className = "",
  edges = defaultEdges,
}: SafeAreaScreenProps) {
  return (
    <SafeAreaView
      edges={edges}
      className={`flex-1 bg-background ${className}`}
    >
      {children}
    </SafeAreaView>
  );
}