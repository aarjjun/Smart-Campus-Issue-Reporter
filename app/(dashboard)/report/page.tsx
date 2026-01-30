"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Upload,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  X,
  Image as ImageIcon,
  Loader2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Details", icon: FileText },
  { id: 2, title: "Photo", icon: Upload },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Confirm", icon: CheckCircle2 },
];

const categories = [
  "Infrastructure",
  "Electrical",
  "Plumbing",
  "Cleanliness",
  "Safety",
  "Other",
];

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null as File | null,
    imagePreview: "",
    location: "",
    autoLocation: true,
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: URL.createObjectURL(file),
        }));
      }
    },
    []
  );

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imagePreview: "",
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return true; // Image is optional
      case 3:
        return formData.autoLocation || formData.location;
      default:
        return true;
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Issue Reported!</h1>
          <p className="text-muted-foreground mb-6">
            Your issue has been submitted successfully. You&apos;ll receive
            updates as it&apos;s being resolved.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => (window.location.href = "/issues")}>
              View My Issues
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
                setFormData({
                  title: "",
                  description: "",
                  category: "",
                  image: null,
                  imagePreview: "",
                  location: "",
                  autoLocation: true,
                });
              }}
            >
              Report Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Report an Issue</h1>
        <p className="text-muted-foreground mt-1">
          Help us make your campus better
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                    currentStep >= step.id ? "bg-primary" : "bg-muted"
                  )}
                >
                  <step.icon
                    className={cn(
                      "h-5 w-5",
                      currentStep >= step.id ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium hidden sm:block",
                    currentStep >= step.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 sm:w-16 mx-2 transition-colors",
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card className="p-6 md:p-8">
        {/* Step 1: Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Issue Title
              </label>
              <Input
                placeholder="e.g., Broken street light near library"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={cn(
                      "px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                      formData.category === cat
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-input hover:border-primary/50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                  placeholder="Describe the issue in detail..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[120px]"
                />
              </div>
            </div>
        )}

        {/* Step 2: Photo */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Upload Photo (Optional)
              </label>
              {formData.imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <span className="text-sm text-muted-foreground">
                    Click or drag to upload
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium">Location</label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        autoLocation: e.target.checked,
                      })
                    }
                    className="rounded border-input"
                  />
                  <span className="text-muted-foreground">
                    Use current location
                  </span>
                </label>
              </div>

              {formData.autoLocation ? (
                <div className="h-64 rounded-xl border bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Location detected</p>
                    <p className="text-xs text-muted-foreground">
                      Main Library Area
                    </p>
                  </div>
                </div>
              ) : (
                <Input
                  placeholder="Enter location manually"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              )}
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm">
                AI will analyze and prioritize your issue automatically
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Title</p>
                <p className="font-medium">{formData.title}</p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <p className="font-medium">{formData.category}</p>
              </div>

              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm">{formData.description}</p>
              </div>

              {formData.imagePreview && (
                <div className="rounded-lg border overflow-hidden">
                  <img
                    src={formData.imagePreview}
                    alt="Issue"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className="p-4 rounded-lg border bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Location</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {formData.autoLocation
                    ? "Main Library Area (Auto-detected)"
                    : formData.location}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            variant="primary"
            onClick={nextStep}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : currentStep === 4 ? (
              <>
                Submit Report
                <CheckCircle2 className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
