"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import {
  FileText,
  Search,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
  MapPin,
  Bell,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Easy Reporting",
    description:
      "Report issues in seconds with our intuitive step-by-step form. Add photos, location, and details effortlessly.",
  },
  {
    icon: Search,
    title: "Real-time Tracking",
    description:
      "Track your issues from submission to resolution. Get notified at every step of the process.",
  },
  {
    icon: CheckCircle2,
    title: "Quick Resolution",
    description:
      "AI-powered prioritization ensures critical issues get resolved faster. See average resolution times.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your reports are secure and your privacy is protected. Anonymous reporting available.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Administrators get powerful insights with visual analytics and trend reports.",
  },
  {
    icon: MapPin,
    title: "Location Mapping",
    description:
      "Interactive heatmaps show issue hotspots across campus for better resource allocation.",
  },
];

const steps = [
  {
    number: "01",
    title: "Report",
    description: "Describe the issue, upload a photo, and pin the location.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Track",
    description: "Monitor your issue's status in real-time with updates.",
    icon: Search,
  },
  {
    number: "03",
    title: "Resolve",
    description: "Get notified when your issue is resolved successfully.",
    icon: CheckCircle2,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Making campus life better, one issue at a time
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Report campus issues.
            <br />
            <span className="text-primary">Track resolutions.</span>
            <br />
            Make your campus better.
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            The smartest way to report and track campus issues. From broken
            lights to maintenance requests—everything in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="primary" asChild>
              <Link href="/report" className="gap-2">
                Report an Issue
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 pt-8 border-t">
            {[
              { value: "500+", label: "Issues Resolved" },
              { value: "24h", label: "Avg Response Time" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to a better campus experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="bg-card rounded-lg p-8 border h-full">
                  <div className="text-5xl font-bold text-muted-foreground mb-4">
                    {step.number}
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed to make campus issue reporting seamless
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="bg-card rounded-lg p-6 border">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center bg-muted rounded-lg p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative">
            <Bell className="h-12 w-12 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to make a difference?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Join hundreds of students already making their campus better.
              Start reporting issues today.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/register" className="gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground font-bold text-sm">SC</span>
              </div>
              <span className="font-semibold">Smart Campus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Smart Campus Issue Reporter. Built with ❤️ for hackathon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
