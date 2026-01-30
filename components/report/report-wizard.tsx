"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Camera, Check, MapPin, Tag, UploadCloud, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Steps
const STEPS = [
    { id: "category", title: "What type of issue is this?", icon: Tag },
    { id: "location", title: "Where is the problem?", icon: MapPin },
    { id: "details", title: "Add some details.", icon: Camera },
    { id: "review", title: "Review Report", icon: Check },
]

const CATEGORIES = [
    "Maintenance", "Electrical", "Plumbing", "IT / Network", "Safety", "Other"
]

export function ReportWizard() {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [formData, setFormData] = React.useState({
        category: "",
        location: "",
        description: "",
        image: null as string | null,
    })

    // Simulated Drag & Drop state
    const [isDragging, setIsDragging] = React.useState(false)

    const next = () => setCurrentStep((p) => Math.min(p + 1, STEPS.length - 1))
    const back = () => setCurrentStep((p) => Math.max(p - 1, 0))

    return (
        <div className="max-w-2xl mx-auto py-8 md:py-16 px-6">
            {/* Progress Indicator - Minimal */}
            <div className="flex items-center gap-2 mb-12">
                {STEPS.map((step, i) => (
                    <motion.div
                        key={step.id}
                        className={cn(
                            "h-1.5 rounded-full transition-colors duration-500",
                            i <= currentStep ? "bg-primary" : "bg-muted"
                        )}
                        initial={false}
                        animate={{ flex: i === currentStep ? 2 : 1 }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="space-y-8 min-h-[400px]">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                                {STEPS[currentStep].title}
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Step {currentStep + 1} of {STEPS.length}
                            </p>
                        </div>

                        {/* Step 1: Category */}
                        {currentStep === 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setFormData({ ...formData, category: cat })
                                            // Auto advance for smoother flow
                                            setTimeout(next, 250)
                                        }}
                                        className={cn(
                                            "p-6 rounded-2xl border text-left transition-all duration-200 hover:scale-[1.02]",
                                            formData.category === cat
                                                ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                                                : "bg-card border-border hover:border-primary/50"
                                        )}
                                    >
                                        <span className="font-medium text-lg">{cat}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Location */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <MapPin className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <Input
                                        placeholder="Search campus location..."
                                        className="pl-14 h-16 text-lg rounded-2xl border-border/60 bg-muted/20 focus:bg-background transition-all shadow-sm"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        autoFocus
                                    />
                                </div>

                                {/* Map Placeholder */}
                                <div className="h-64 bg-muted/30 rounded-2xl border border-border/50 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/0,0,2,0,0/600x400?access_token=Pk')] bg-cover opacity-50 grayscale" />
                                    <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-full text-sm font-medium z-10 flex items-center gap-2 shadow-sm">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        Pin precise location on map (Coming Soon)
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <Textarea
                                    className="min-h-[160px] text-lg p-6 bg-muted/20 border-border/60 focus:bg-background transition-all resize-none rounded-2xl"
                                    placeholder="Describe the issue in detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    autoFocus
                                />

                                {/* Drag & Drop Upload */}
                                <div
                                    className={cn(
                                        "border-2 border-dashed border-border rounded-3xl p-10 text-center cursor-pointer transition-all duration-200",
                                        isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "hover:bg-muted/30 hover:border-primary/50"
                                    )}
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setIsDragging(false);
                                        // Simulating file drop
                                        setFormData({ ...formData, image: "uploaded-image.jpg" })
                                    }}
                                    onClick={() => setFormData({ ...formData, image: "uploaded-image.jpg" })}
                                >
                                    {formData.image ? (
                                        <div className="flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium">Image attached successfully</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFormData({ ...formData, image: null })
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2 pointer-events-none">
                                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                                <UploadCloud className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                            <p className="text-lg font-medium">Click to upload or drag and drop</p>
                                            <p className="text-sm text-muted-foreground">SVG, PNG, JPG or GIF (max. 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Review */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="bg-card p-8 rounded-3xl border shadow-sm space-y-6">
                                    <div className="flex items-start justify-between border-b border-border/50 pb-6">
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Issue Type</p>
                                            <p className="text-2xl font-medium">{formData.category}</p>
                                        </div>
                                        <Tag className="w-6 h-6 text-muted-foreground" />
                                    </div>

                                    <div className="flex items-start justify-between border-b border-border/50 pb-6">
                                        <div>
                                            <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Location</p>
                                            <p className="text-xl font-medium">{formData.location}</p>
                                        </div>
                                        <MapPin className="w-6 h-6 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-2">Description</p>
                                        <p className="text-lg text-foreground/80 leading-relaxed">
                                            {formData.description || "No description provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-8">
                            <Button
                                variant="ghost"
                                onClick={back}
                                disabled={currentStep === 0}
                                className={cn("text-muted-foreground", currentStep === 0 && "opacity-0")}
                            >
                                Back
                            </Button>

                            <Button
                                size="lg"
                                onClick={next}
                                className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20"
                                disabled={
                                    (currentStep === 1 && !formData.location)
                                }
                            >
                                {currentStep === STEPS.length - 1 ? (
                                    <span className="flex items-center gap-2">Submit Report <Check className="w-4 h-4" /></span>
                                ) : (
                                    <span className="flex items-center gap-2">Continue <ArrowRight className="w-4 h-4" /></span>
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
