"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from "framer-motion"

interface ContainerScrollProps {
  titleComponent: React.ReactNode
  children: React.ReactNode
}

export const ContainerScroll = ({
  titleComponent,
  children,
}: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.92, 1] : [1.12, 1]
  }

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [18, 0]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleDimensions()
  )

  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -120]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0.4, 1, 1]
  )

  return (
    <section
      ref={containerRef}
      className="
        relative
        flex
        items-center
        justify-center
        min-h-[120vh]
        px-4
        md:px-10
        py-20
      "
    >

      {/* AMBIENT LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[500px]
            rounded-full
            bg-[#dbe8ff]
            blur-3xl
            opacity-30
          "
        />

      </div>

      <div
        className="
          relative
          w-full
          max-w-[1600px]
        "
        style={{
          perspective: "1800px",
        }}
      >

        {/* TITLE */}
        <Header
          translate={translate}
          opacity={opacity}
          titleComponent={titleComponent}
        />

        {/* CARD */}
        <Card
          rotate={rotate}
          scale={scale}
        >
          {children}
        </Card>

      </div>

    </section>
  )
}

interface HeaderProps {
  translate: MotionValue<number>
  opacity: MotionValue<number>
  titleComponent: React.ReactNode
}

const Header = ({
  translate,
  opacity,
  titleComponent,
}: HeaderProps) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity,
      }}
      className="
        relative
        z-20
        max-w-6xl
        mx-auto
        text-center
        mb-20
      "
    >
      {titleComponent}
    </motion.div>
  )
}

interface CardProps {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}

const Card = ({
  rotate,
  scale,
  children,
}: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformPerspective: 1800,
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.06), 0 40px 120px rgba(0,0,0,0.12)",
      }}
      className="
        relative
        mx-auto
        w-full
        max-w-7xl
        rounded-[40px]
        border
        border-black/10
        bg-[#111111]
        overflow-hidden
      "
    >

      {/* TOP CHROME */}
      <div
        className="
          h-14
          px-6
          border-b
          border-white/10
          flex
          items-center
          justify-between
          bg-[#151515]
        "
      >

        {/* LEFT DOTS */}
        <div className="flex items-center gap-2">

          <div className="w-3 h-3 rounded-full bg-white/20" />

          <div className="w-3 h-3 rounded-full bg-white/20" />

          <div className="w-3 h-3 rounded-full bg-white/20" />

        </div>

        {/* CENTER LABEL */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-2
            text-[11px]
            uppercase
            tracking-[0.24em]
            text-white/40
            font-mono
          "
        >

          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

          Operational Dashboard

        </div>

        {/* RIGHT STATUS */}
        <div
          className="
            hidden
            md:block
            text-[11px]
            uppercase
            tracking-[0.24em]
            text-white/30
            font-mono
          "
        >
          Live
        </div>

      </div>

      {/* INNER CONTENT */}
      <div
        className="
          relative
          aspect-[16/9]
          w-full
          overflow-hidden
          bg-[#0f0f0f]
        "
      >
        {children}

        {/* OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]
          "
        />

      </div>

    </motion.div>
  )
}