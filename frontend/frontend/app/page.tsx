"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Upload,
  Users,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Automatically compute averages, distributions, and enrollment trends across clinical datasets.",
  },
  {
    icon: Upload,
    title: "Flexible Data Ingestion",
    description:
      "Support for wide and long CSV formats with automatic schema detection and validation.",
  },
  {
    icon: Users,
    title: "Participant Tracking",
    description:
      "Monitor enrollment status, demographics, and outcomes with interactive visualizations.",
  },
  {
    icon: Zap,
    title: "Instant Insights",
    description:
      "Generate statistical summaries and categorical breakdowns the moment data is uploaded.",
  },
  {
    icon: Shield,
    title: "Research-Grade Security",
    description:
      "Built with healthcare compliance in mind, ensuring data integrity and privacy.",
  },
  {
    icon: Sparkles,
    title: "AI-Ready Infrastructure",
    description:
      "Designed to integrate with machine learning pipelines for predictive analytics.",
  },
]

const steps = [
  {
    step: "01",
    title: "Create a Study",
    description: "Define your clinical trial parameters and research objectives.",
  },
  {
    step: "02",
    title: "Upload Dataset",
    description: "Import CSV files with participant data in any standard format.",
  },
  {
    step: "03",
    title: "Explore Insights",
    description: "Visualize trends, track enrollment, and generate reports.",
  },
]

const stats = [
  { value: "50K+", label: "Participants Tracked" },
  { value: "200+", label: "Active Studies" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 100ms", label: "Query Response" },
]

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial" />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 size-[600px] rounded-full bg-primary/10 blur-[120px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 size-[500px] rounded-full bg-chart-2/10 blur-[100px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">OpenTrials</span>
          </Link>
          
          <div className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How it Works
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button size="sm" className="gap-2" asChild>
              <Link href="/studies">
                Get Started
                <ArrowRight className="size-3" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
              <Sparkles className="size-3" />
              Now in Public Beta
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-balance">Clinical Research Analytics</span>
            <br />
            <span className="gradient-text">Made Simple</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl"
          >
            Transform clinical trial data into actionable insights. Upload datasets,
            generate real-time analytics, and visualize enrollment trends with our
            enterprise-grade platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/studies">
                Start Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                View Demo
              </Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-background bg-muted"
                />
              ))}
            </div>
            <span>Trusted by 200+ research institutions</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for clinical research
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A comprehensive suite of tools designed for modern clinical trial management and analysis.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 border-y border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="secondary" className="mb-4">How It Works</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Get started in minutes
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Three simple steps to transform your clinical data into insights.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/20">{step.step}</div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-full bg-gradient-to-r from-border to-transparent md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm sm:p-12 md:p-16"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-chart-2/10" />
          
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your research?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join hundreds of research institutions using OpenTrials to accelerate clinical discoveries.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/studies">
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="size-4 text-success" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="size-4 text-success" />
                14-day free trial
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary">
                <Activity className="size-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">OpenTrials</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Aryan Lodha. Open source clinical research platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
