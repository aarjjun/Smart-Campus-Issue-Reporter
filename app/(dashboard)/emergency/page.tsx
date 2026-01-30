"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Camera,
  Send,
  CheckCircle2,
  Loader2,
  Shield,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const emergencyTypes = [
  { id: "fire", label: "Fire", icon: "🔥" },
  { id: "medical", label: "Medical", icon: "🏥" },
  { id: "security", label: "Security", icon: "🚨" },
  { id: "accident", label: "Accident", icon: "⚠️" },
  { id: "hazard", label: "Hazard", icon: "☢️" },
  { id: "other", label: "Other", icon: "📢" },
];

export default function EmergencyPage() {
  const [isReporting, setIsReporting] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmergencyReport = async () => {
    if (!selectedType) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsReporting(false);
    setSelectedType(null);
    setDescription("");
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Emergency Response System
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Emergency Mode
          </h1>
          <p className="text-muted-foreground">
            Report critical issues requiring immediate attention
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Emergency Reported!</h2>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                Your emergency has been reported. Help is on the way. Stay calm
                and stay safe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  className="border-muted text-foreground hover:bg-muted"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Back to Dashboard
                </Button>
                <Button
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  onClick={resetForm}
                >
                  Report Another
                </Button>
              </div>
            </motion.div>
          ) : !isReporting ? (
            // Initial State - Big Red Button
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-8"
            >
              {/* Pulsing Emergency Button */}
              <div className="relative mb-12">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsReporting(true)}
                  className="relative h-48 w-48 rounded-full bg-destructive text-destructive-foreground shadow-lg flex flex-col items-center justify-center gap-2 transition-shadow hover:shadow-xl"
                >
                  <AlertTriangle className="h-16 w-16" />
                  <span className="text-xl font-bold">
                    REPORT
                  </span>
                </motion.button>
              </div>

              <p className="text-muted-foreground text-center mb-8 max-w-sm">
                Tap the button above to report an emergency situation on campus
              </p>

              {/* Quick Call Actions */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <Card className="bg-muted/30 border-muted p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Campus Security</p>
                      <p className="text-sm font-semibold">
                        555-0123
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-muted/30 border-muted p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Emergency</p>
                      <p className="text-sm font-semibold">911</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          ) : (
            // Reporting Form
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Emergency Type Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  What type of emergency?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {emergencyTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all text-center",
                        selectedType === type.id
                          ? "border-destructive bg-destructive/5"
                          : "border-muted bg-muted/30 hover:border-destructive/50"
                      )}
                    >
                      <span className="text-2xl mb-1 block">{type.icon}</span>
                      <span className="text-sm font-medium">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Brief description (optional)
                </label>
                <Textarea
                  placeholder="Describe the situation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-muted/30 border-muted text-foreground placeholder:text-muted-foreground min-h-[100px]"
                />
              </div>

              {/* Location */}
              <Card className="bg-muted/30 border-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="text-sm font-medium">
                      Main Campus - Block A Area
                    </p>
                  </div>
                  <Zap className="h-4 w-4 text-primary" />
                </div>
              </Card>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={handleEmergencyReport}
                  disabled={!selectedType || isSubmitting}
                  className={cn(
                    "w-full h-14 text-lg font-semibold transition-all",
                    selectedType
                      ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Emergency Report
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center">
                False emergency reports may result in disciplinary action.
                Please use responsibly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
