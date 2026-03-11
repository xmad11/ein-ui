import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designer",
  description: "Visual page designer for creating layouts",
};

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal layout without the global header for designer page
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
