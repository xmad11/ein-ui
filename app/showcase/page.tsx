"use client";

import "./showcase.css";
import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassMorphCard } from "@/registry/innovative/glass-morph-card";
import { GlassRipple, GlassRippleButton } from "@/registry/innovative/glass-ripple";
import { GlassButton } from "@/registry/liquid-glass/glass-button";
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from "@/registry/liquid-glass/glass-card";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";
import { GlassProgress } from "@/registry/liquid-glass/glass-progress";
import { Sparkles, Droplets, Zap, Heart, Star, Layers, Palette, Waves } from "lucide-react";

// ============================================================================
// LIQUID GLASS CARD - Water/Fluid Animation Effect
// ============================================================================
interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "water" | "aurora" | "plasma" | "nebula";
  children: React.ReactNode;
}

const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  ({ className, variant = "water", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative group", className)} {...props}>
        {/* Animated background */}
        <div className={cn(
          "absolute -inset-1 rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500",
          variant === "water" && "liquid-bg-water",
          variant === "aurora" && "liquid-bg-aurora",
          variant === "plasma" && "liquid-bg-plasma",
          variant === "nebula" && "liquid-bg-nebula",
        )} />

        {/* Glass card */}
        <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden">
          {/* Liquid shimmer overlay */}
          <div className="absolute inset-0 liquid-shimmer opacity-30" />

          {/* Water ripple animation */}
          <div className="absolute inset-0 liquid-ripple opacity-20" />

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    );
  }
);
LiquidGlassCard.displayName = "LiquidGlassCard";

// ============================================================================
// FROSTED GLASS CARD - Multiple Blur Levels
// ============================================================================
interface FrostedGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: "sm" | "md" | "lg" | "xl";
  tint?: "white" | "cyan" | "purple" | "rose";
  children: React.ReactNode;
}

const FrostedGlassCard = React.forwardRef<HTMLDivElement, FrostedGlassCardProps>(
  ({ className, blur = "lg", tint = "white", children, ...props }, ref) => {
    const blurClasses = {
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-lg",
      xl: "backdrop-blur-xl",
    };

    const tintClasses = {
      white: "bg-white/10 border-white/20",
      cyan: "bg-cyan-500/10 border-cyan-400/20",
      purple: "bg-purple-500/10 border-purple-400/20",
      rose: "bg-rose-500/10 border-rose-400/20",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl border",
          blurClasses[blur],
          tintClasses[tint],
          "shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
          "hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-shadow duration-300",
          className
        )}
        {...props}
      >
        {/* Frost texture overlay */}
        <div className="absolute inset-0 rounded-2xl frost-texture opacity-10" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
FrostedGlassCard.displayName = "FrostedGlassCard";

// ============================================================================
// GLOW CARD - Animated Glow Effects
// ============================================================================
interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "cyan" | "purple" | "rose" | "emerald" | "amber" | "multi";
  animated?: boolean;
  children: React.ReactNode;
}

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, glowColor = "cyan", animated = true, children, ...props }, ref) => {
    const glowClasses = {
      cyan: "from-cyan-500/50 via-cyan-400/30 to-blue-500/50",
      purple: "from-purple-500/50 via-pink-400/30 to-violet-500/50",
      rose: "from-rose-500/50 via-pink-400/30 to-red-500/50",
      emerald: "from-emerald-500/50 via-teal-400/30 to-green-500/50",
      amber: "from-amber-500/50 via-orange-400/30 to-yellow-500/50",
      multi: "from-cyan-500/50 via-purple-400/30 to-rose-500/50",
    };

    return (
      <div ref={ref} className={cn("relative group", className)} {...props}>
        {/* Animated glow */}
        <div
          className={cn(
            "absolute -inset-2 rounded-3xl bg-gradient-to-r blur-xl",
            glowClasses[glowColor],
            animated && "animate-pulse-glow",
            "opacity-50 group-hover:opacity-80 transition-opacity duration-500"
          )}
        />

        {/* Inner glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-30",
            glowClasses[glowColor]
          )}
        />

        {/* Card */}
        <div className="relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-6">
          {/* Edge highlight */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    );
  }
);
GlowCard.displayName = "GlowCard";

// ============================================================================
// MELTING GLASS CARD - Melting/Liquid Animation
// ============================================================================
interface MeltingGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MeltingGlassCard = React.forwardRef<HTMLDivElement, MeltingGlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative group", className)} {...props}>
        {/* Melting effect layers */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-b-3xl bg-white/5 backdrop-blur-md melting-drip" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[95%] h-4 rounded-b-2xl bg-white/10 backdrop-blur-lg melting-drip-2" />

        {/* Main card */}
        <div className="relative rounded-3xl border border-white/20 bg-white/15 backdrop-blur-xl overflow-hidden">
          {/* Melting border effect */}
          <div className="absolute inset-0 rounded-3xl melting-border" />

          {/* Liquid top edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          <div className="relative z-10">{children}</div>
        </div>
      </div>
    );
  }
);
MeltingGlassCard.displayName = "MeltingGlassCard";

// ============================================================================
// AURORA GLASS CARD - Northern Lights Effect
// ============================================================================
interface AuroraGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const AuroraGlassCard = React.forwardRef<HTMLDivElement, AuroraGlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative group overflow-hidden", className)} {...props}>
        {/* Aurora layers */}
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 aurora-wave-1" />
        <div className="absolute inset-0 aurora-wave-2" />
        <div className="absolute inset-0 aurora-wave-3" />

        {/* Glass overlay */}
        <div className="relative rounded-3xl border border-white/20 bg-black/20 backdrop-blur-xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent" />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    );
  }
);
AuroraGlassCard.displayName = "AuroraGlassCard";

// ============================================================================
// BUBBLE GLASS CARD - Bubble/Orb Effect
// ============================================================================
interface BubbleGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: "cyan" | "purple" | "rose";
  children: React.ReactNode;
}

const BubbleGlassCard = React.forwardRef<HTMLDivElement, BubbleGlassCardProps>(
  ({ className, size = "md", color = "cyan", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "w-48 h-48",
      md: "w-64 h-64",
      lg: "w-80 h-80",
    };

    const colorClasses = {
      cyan: "from-cyan-300/40 via-cyan-400/20 to-blue-500/40",
      purple: "from-purple-300/40 via-purple-400/20 to-pink-500/40",
      rose: "from-rose-300/40 via-rose-400/20 to-red-500/40",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-full bg-gradient-to-br backdrop-blur-xl",
          sizeClasses[size],
          colorClasses[color],
          "shadow-[0_0_60px_rgba(255,255,255,0.1),inset_0_0_40px_rgba(255,255,255,0.1)]",
          "hover:shadow-[0_0_80px_rgba(255,255,255,0.2),inset_0_0_60px_rgba(255,255,255,0.15)]",
          "transition-all duration-500",
          "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {/* Bubble highlight */}
        <div className="absolute top-4 left-1/4 w-1/2 h-1/4 rounded-full bg-white/30 blur-sm" />
        <div className="absolute top-6 left-1/3 w-1/4 h-1/6 rounded-full bg-white/50 blur-xs" />

        {/* Content */}
        <div className="relative z-10 text-center">{children}</div>
      </div>
    );
  }
);
BubbleGlassCard.displayName = "BubbleGlassCard";

// ============================================================================
// MAIN SHOWCASE PAGE
// ============================================================================
export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="fixed inset-0 showcase-bg-grid opacity-20" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />

      <div className="relative z-10 px-4 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <GlassBadge variant="primary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            2026 Design Trends
          </GlassBadge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Glass Effects
            </span>
            <br />
            Showcase
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Explore the latest glassmorphism, liquid glass, and 3D effects for modern UI design.
            Interactive samples with beautiful animations.
          </p>
        </div>

        {/* Section 1: Liquid Glass Variants */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Droplets className="w-8 h-8 text-cyan-400" />
              Liquid Glass Variants
            </h2>
            <p className="text-white/50">Water-like fluid animations with glass morphism</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["water", "aurora", "plasma", "nebula"] as const).map((variant) => (
              <LiquidGlassCard key={variant} variant={variant} className="h-64">
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <Waves className="w-6 h-6 text-white/70" />
                    </div>
                    <h3 className="text-xl font-semibold text-white capitalize mb-2">{variant}</h3>
                    <p className="text-white/50 text-sm">
                      Beautiful {variant} inspired liquid glass effect
                    </p>
                  </div>
                  <GlassProgress value={Math.random() * 100} />
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </section>

        {/* Section 2: 3D Morph Cards */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 text-purple-400" />
              3D Glass Morph Cards
            </h2>
            <p className="text-white/50">Interactive 3D tilt with dynamic light reflection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {(["cyan", "purple", "blue", "pink", "green"] as const).map((color) => (
              <GlassMorphCard key={color} glowColor={color} intensity={12} className="h-72">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white capitalize mb-2">{color}</h3>
                    <p className="text-white/50 text-xs">
                      Hover to see 3D tilt effect
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Progress</span>
                      <span>{Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <GlassProgress value={Math.random() * 100} />
                  </div>
                </div>
              </GlassMorphCard>
            ))}
          </div>
        </section>

        {/* Section 3: Glow Effects */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 text-amber-400" />
              Glow Effects
            </h2>
            <p className="text-white/50">Animated glow with multiple color options</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(["cyan", "purple", "rose", "emerald", "amber", "multi"] as const).map((color) => (
              <GlowCard key={color} glowColor={color} animated={true} className="h-48">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white capitalize">{color} Glow</h3>
                      <p className="text-white/40 text-xs">Animated pulse effect</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <GlassBadge variant={color === "emerald" ? "success" : color === "amber" ? "warning" : "primary"}>
                      Active
                    </GlassBadge>
                  </div>
                  <div className="flex gap-2">
                    <GlassButton variant="ghost" size="sm" className="flex-1">Action</GlassButton>
                    <GlassButton variant="primary" size="sm" className="flex-1">Confirm</GlassButton>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

        {/* Section 4: Frosted Glass */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Palette className="w-8 h-8 text-rose-400" />
              Frosted Glass
            </h2>
            <p className="text-white/50">Multiple blur levels and color tints</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-rose-500/20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`
              }} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {(["sm", "md", "lg", "xl"] as const).map((blur) => (
                <React.Fragment key={blur}>
                  {(["white", "cyan", "purple", "rose"] as const).map((tint) => (
                    <FrostedGlassCard key={`${blur}-${tint}`} blur={blur} tint={tint} className="h-32">
                      <div className="p-4 h-full flex flex-col justify-between">
                        <span className="text-xs text-white/60 capitalize">{blur} blur</span>
                        <span className="text-xs text-white/40 capitalize">{tint} tint</span>
                      </div>
                    </FrostedGlassCard>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Melting Glass */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Melting Glass Effect</h2>
            <p className="text-white/50">Liquid dripping animation at bottom edge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <MeltingGlassCard key={i} className="h-64">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-4">
                      <Droplets className="w-6 h-6 text-white/70" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Melting Card {i}</h3>
                    <p className="text-white/50 text-sm">
                      Beautiful liquid dripping effect
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <GlassRippleButton variant="default" className="flex-1">
                      Explore
                    </GlassRippleButton>
                  </div>
                </div>
              </MeltingGlassCard>
            ))}
          </div>
        </section>

        {/* Section 6: Aurora Effect */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Aurora Glass</h2>
            <p className="text-white/50">Northern lights inspired animated gradients</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AuroraGlassCard className="h-80">
              <div className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Aurora Dashboard</h3>
                <p className="text-white/50 flex-1">
                  Experience the mesmerizing northern lights effect with animated gradients
                  flowing across the glass surface.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">128</div>
                    <div className="text-xs text-white/40">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">56K</div>
                    <div className="text-xs text-white/40">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">99%</div>
                    <div className="text-xs text-white/40">Uptime</div>
                  </div>
                </div>
              </div>
            </AuroraGlassCard>

            <AuroraGlassCard className="h-80">
              <div className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">CPU</span>
                      <span className="text-white text-sm">42%</span>
                    </div>
                    <GlassProgress value={42} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Memory</span>
                      <span className="text-white text-sm">68%</span>
                    </div>
                    <GlassProgress value={68} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Storage</span>
                      <span className="text-white text-sm">35%</span>
                    </div>
                    <GlassProgress value={35} />
                  </div>
                </div>
              </div>
            </AuroraGlassCard>
          </div>
        </section>

        {/* Section 7: Bubble Glass */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Bubble Glass</h2>
            <p className="text-white/50">Orb-shaped glass elements with highlight effects</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {(["cyan", "purple", "rose"] as const).map((color) => (
              <BubbleGlassCard key={color} color={color} size="md">
                <div className="text-white">
                  <div className="text-4xl font-bold">{color === "cyan" ? "42" : color === "purple" ? "78" : "95"}</div>
                  <div className="text-sm text-white/60 capitalize">{color}</div>
                </div>
              </BubbleGlassCard>
            ))}
          </div>
        </section>

        {/* Section 8: Ripple Effect Cards */}
        <section className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ripple Effect</h2>
            <p className="text-white/50">Click to see water ripple animation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["cyan", "purple", "white", "blue"] as const).map((color) => (
              <GlassRipple key={color} color={color} className="rounded-2xl">
                <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl h-48">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <Waves className="w-6 h-6 text-white/70" />
                    </div>
                    <h3 className="text-lg font-semibold text-white capitalize mb-2">{color} Ripple</h3>
                    <p className="text-white/50 text-sm flex-1">
                      Click anywhere to see the ripple effect
                    </p>
                    <GlassProgress value={Math.random() * 100} />
                  </div>
                </div>
              </GlassRipple>
            ))}
          </div>
        </section>

        {/* Section 9: Combined Effects */}
        <section className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Combined Effects</h2>
            <p className="text-white/50">Multiple effects combined for stunning visuals</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Glow + Morph + Aurora */}
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-rose-500/30 blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <AuroraGlassCard className="h-96">
                <GlassMorphCard glowColor="purple" intensity={8} className="h-full bg-transparent border-0">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/40 to-cyan-500/40 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Ultimate Glass</h3>
                        <p className="text-white/50">Glow + Aurora + 3D Morph</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-white/60">
                        This card combines multiple effects: animated aurora background,
                        3D tilt on hover, and pulsing glow effect.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5">
                          <div className="text-2xl font-bold text-white">2.4K</div>
                          <div className="text-xs text-white/40">Active Users</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                          <div className="text-2xl font-bold text-white">$48K</div>
                          <div className="text-xs text-white/40">Revenue</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <GlassButton variant="outline" className="flex-1">Learn More</GlassButton>
                      <GlassButton variant="primary" className="flex-1">Get Started</GlassButton>
                    </div>
                  </div>
                </GlassMorphCard>
              </AuroraGlassCard>
            </div>

            {/* Liquid + Ripple + Glow */}
            <div className="relative group">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-rose-500/30 via-amber-500/30 to-emerald-500/30 blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <LiquidGlassCard variant="plasma" className="h-96">
                <GlassRipple color="white" className="h-full rounded-2xl">
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/40 to-amber-500/40 flex items-center justify-center">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Plasma Glass</h3>
                        <p className="text-white/50">Liquid + Ripple + Multi-glow</p>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <p className="text-white/60">
                        Click anywhere to see ripple effects. The liquid plasma
                        background creates a dynamic, living interface.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/60 text-sm">Performance</span>
                            <span className="text-white text-sm">94%</span>
                          </div>
                          <GlassProgress value={94} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-white/60 text-sm">Reliability</span>
                            <span className="text-white text-sm">99.9%</span>
                          </div>
                          <GlassProgress value={99} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <GlassRippleButton variant="outline" className="flex-1">Details</GlassRippleButton>
                      <GlassRippleButton variant="primary" className="flex-1">Activate</GlassRippleButton>
                    </div>
                  </div>
                </GlassRipple>
              </LiquidGlassCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/5">
          <p className="text-white/30 text-sm">
            Glass Effects Showcase &mdash; 2026 Design Trends
          </p>
        </footer>
      </div>
    </main>
  );
}
