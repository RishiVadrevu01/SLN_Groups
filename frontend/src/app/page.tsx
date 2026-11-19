"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ThreeBackground from "../components/ThreeBackground";
import TiltCard from "../components/TiltCard";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  Layers,
  Calendar,
  Send,
  Menu,
  X,
  Sparkles,
  Maximize2,
  Eye,
  ChevronRight,
  Check,
} from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "COMPLETED" | "ONGOING" | "UPCOMING";
  propertyType: string;
  location: string;
  address: string;
  city: string;
  totalAreaSqFt: string;
  unitsCount?: string;
  floors?: string;
  completionYear?: string;
  expectedPossession?: string;
  featuredImage: string;
  galleryImages?: string[];
  amenities?: string[];
  highlights?: string[];
  isFeatured?: boolean;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "sln-grandeur",
    title: "SLN Grandeur",
    tagline: "Ultra-Luxury 3 & 4 BHK Sky Residences",
    description:
      "An iconic 42-storey architectural wonder in the Financial District featuring double-height marble lobbies, sky lounge, and private infinity deck.",
    category: "ONGOING",
    propertyType: "RESIDENTIAL_LUXURY",
    location: "Financial District, Gachibowli",
    address: "Plot 42, Financial District, Nanakramguda",
    city: "Hyderabad",
    totalAreaSqFt: "1,850,000",
    unitsCount: "340 Residences",
    floors: "G+42 Floors",
    expectedPossession: "December 2026",
    featuredImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Infinity Edge Olympic Pool",
      "Private Cigar & Club Lounge",
      "Biometric Home Automation",
      "Helipad & Valet Concierge",
      "Squash & Padel Tennis Arena",
    ],
    highlights: [
      "IGBC Platinum Pre-Certified",
      "360° Panoramic Skyline Views",
      "Italian Bottochino Marble",
    ],
    isFeatured: true,
  },
  {
    id: "2",
    slug: "sln-eden-villas",
    title: "SLN Eden Villas",
    tagline: "Private Gated Signature Villa Community",
    description:
      "Exclusive 5 BHK signature estates nestled in 25 acres of lush landscaped flora, private plunge pools, and organic orchards.",
    category: "COMPLETED",
    propertyType: "EXCLUSIVE_VILLAS",
    location: "Moinabad",
    address: "Chevella Road, Moinabad",
    city: "Hyderabad",
    totalAreaSqFt: "750,000",
    unitsCount: "65 Bespoke Villas",
    completionYear: "2024",
    featuredImage:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "Private Plunge Pool per Villa",
      "Miyawaki Forest Trails",
      "24/7 Multi-Tier Perimeter Security",
      "Organic Vegetable Patch",
    ],
    highlights: ["Ready to Move In (Full OC Received)", "100% Vastu Compliant"],
    isFeatured: true,
  },
  {
    id: "3",
    slug: "sln-one-tower",
    title: "SLN One Corporate Landmark",
    tagline: "Grade-A Sustainable Commercial Headquarters",
    description:
      "Premier commercial landmark offering column-free floor plates, destination-controlled high-speed elevators, and luxury retail promenade.",
    category: "UPCOMING",
    propertyType: "COMMERCIAL_LANDMARK",
    location: "Jubilee Hills",
    address: "Road No. 36, Jubilee Hills",
    city: "Hyderabad",
    totalAreaSqFt: "920,000",
    floors: "G+24 Floors",
    expectedPossession: "Q3 2027",
    featuredImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    ],
    amenities: [
      "LEED Platinum Core & Shell",
      "Retail Promenade & Cafeteria",
      "Multi-Level Automated Parking",
    ],
    highlights: ["Strategic Central Business Hub", "High Capital Appreciation"],
    isFeatured: true,
  },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "plans" | "amenities">("overview");

  // Consultation Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectInterest: "SLN Grandeur",
    budgetRange: "₹2.5 Cr - ₹4.5 Cr",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load live projects from backend
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("http://localhost:5000/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
          }
        }
      } catch {
        // Fallback remains active seamlessly
      }
    }
    loadProjects();
  }, []);

  const filteredProjects =
    filterCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#c5a059", "#f59e0b", "#fbbf24", "#ffffff"],
    });
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(false);

    try {
      await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      triggerCelebration();
      setSubmitSuccess(true);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        projectInterest: "SLN Grandeur",
        budgetRange: "₹2.5 Cr - ₹4.5 Cr",
        message: "",
      });
    } catch {
      triggerCelebration();
      setSubmitSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* 1. 3D Particle Constellation Background */}
      <ThreeBackground />

      {/* 2. Glassmorphism Sticky Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-amber-500/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3.5 cursor-pointer"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest text-white uppercase block">
                SLN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">GROUPS</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold">
                Luxury Developments & Estates
              </span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#projects" className="hover:text-amber-400 transition-colors">
              Developments
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors">
              About SLN
            </a>
            <a href="#leadership" className="hover:text-amber-400 transition-colors">
              Leadership
            </a>
            <a href="#branches" className="hover:text-amber-400 transition-colors">
              Offices
            </a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
            >
              Book Consultation
            </motion.a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-2xl border-b border-amber-500/20 px-6 py-5 space-y-4"
            >
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-amber-400 text-base"
              >
                Developments
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-amber-400 text-base"
              >
                About SLN
              </a>
              <a
                href="#leadership"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-amber-400 text-base"
              >
                Leadership
              </a>
              <a
                href="#branches"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-amber-400 text-base"
              >
                Offices
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-lg"
              >
                Book Consultation
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 3. Hero Section with Interactive Parallax */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
            alt="SLN Grandeur"
            fill
            priority
            className="object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-amber-500/10"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Three Decades of Architectural Mastery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.08]"
          >
            Architecting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-[0_10px_25px_rgba(217,178,85,0.25)]">
              Landmarks
            </span>{" "}
            of Tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-300 mb-12 font-light leading-relaxed"
          >
            South India’s pre-eminent luxury residences, signature gated villa sanctuaries, and IGBC Platinum commercial developments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5"
            >
              Explore Developments <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-base backdrop-blur-md transition-all"
            >
              Schedule Private Walkthrough
            </motion.a>
          </motion.div>

          {/* Interactive Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-amber-500/20 backdrop-blur-sm"
          >
            {[
              { num: "30+", label: "Years of Legacy" },
              { num: "10M+", label: "Sq. Ft. Constructed" },
              { num: "15,000+", label: "Happy Families" },
              { num: "100%", label: "Vastu Compliant" },
            ].map((stat, i) => (
              <div key={i} className="group p-4 rounded-xl hover:bg-slate-900/40 transition-colors">
                <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 group-hover:scale-105 transition-transform duration-300">
                  {stat.num}
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Developments Portfolio with 3D Tilt Cards */}
      <section id="projects" className="py-28 relative z-10 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-3">
                Architectural Landmarks
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Featured Developments
              </h2>
            </div>

            {/* Filter Tabs with Animated Indicator */}
            <div className="mt-8 md:mt-0 flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              {[
                { label: "All Properties", value: "ALL" },
                { label: "Ongoing", value: "ONGOING" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Upcoming", value: "UPCOMING" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilterCategory(tab.value)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all z-10 ${
                    filterCategory === tab.value
                      ? "text-slate-950 font-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {filterCategory === tab.value && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl -z-10 shadow-lg shadow-amber-500/25"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project 3D Tilt Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TiltCard className="h-full rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/50 shadow-2xl overflow-hidden flex flex-col justify-between backdrop-blur-md group">
                    <div>
                      {/* Image Preview */}
                      <div className="relative h-68 w-full overflow-hidden">
                        <Image
                          src={project.featuredImage}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg ${
                              project.category === "COMPLETED"
                                ? "bg-emerald-500/90 text-white"
                                : project.category === "ONGOING"
                                ? "bg-amber-500/90 text-slate-950"
                                : "bg-indigo-500/90 text-white"
                            }`}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Quick View Button on Image */}
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="absolute top-4 left-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="truncate">{project.location}, {project.city}</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-7">
                        <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-semibold text-amber-400/90 mt-1 mb-3">
                          {project.tagline}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6 font-light">
                          {project.description}
                        </p>

                        {/* Property Specs Pill Grid */}
                        <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-slate-800 text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5 text-amber-400" />
                            <span>{project.totalAreaSqFt} Sq. Ft.</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>
                              {project.completionYear
                                ? `Ready: ${project.completionYear}`
                                : project.expectedPossession || "2026"}
                            </span>
                          </div>
                        </div>

                        {/* Highlights list */}
                        {project.highlights && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.highlights.slice(0, 2).map((h, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 text-[10px] font-medium"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-7 pt-0 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                      <a
                        href="#contact"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, projectInterest: project.title }))
                        }
                        className="py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                      >
                        Inquire <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. Project Quick View / Architectural Inspection Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/20"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-400">
                  {activeModalProject.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeModalProject.location}, {activeModalProject.city}
                </span>
              </div>

              <h2 className="text-3xl font-black text-white">{activeModalProject.title}</h2>
              <p className="text-sm font-semibold text-amber-400/90 mt-1 mb-6">
                {activeModalProject.tagline}
              </p>

              {/* Main Photo Gallery */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 border border-slate-800">
                <Image
                  src={activeModalProject.featuredImage}
                  alt={activeModalProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Tabs */}
              <div className="flex gap-3 border-b border-slate-800 pb-3 mb-6">
                {(["overview", "plans", "amenities"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveModalTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activeModalTab === tab
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeModalTab === "overview" && (
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                  <p>{activeModalProject.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Area</span>
                      <span className="font-bold text-white">{activeModalProject.totalAreaSqFt} Sq. Ft.</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Total Units</span>
                      <span className="font-bold text-white">{activeModalProject.unitsCount || "Bespoke"}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Floors</span>
                      <span className="font-bold text-white">{activeModalProject.floors || "Multi-Level"}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block">Status</span>
                      <span className="font-bold text-amber-400">{activeModalProject.category}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === "plans" && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <p className="text-amber-400 font-bold mb-2">Architectural Blueprint & Floor Layouts</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
                    Detailed AutoCAD engineering floor plans and CAD elevation renders available for registered clients.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                      3 BHK Sky Residence (2,850 Sq. Ft.)
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                      4 BHK Royal Suite (4,100 Sq. Ft.)
                    </span>
                    <span className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                      Signature Duplex Penthouse (6,800 Sq. Ft.)
                    </span>
                  </div>
                </div>
              )}

              {activeModalTab === "amenities" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(activeModalProject.amenities || [
                    "Olympic Infinity Pool",
                    "Cigar Lounge",
                    "Helipad",
                    "Smart Home Automation",
                  ]).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200"
                    >
                      <Check className="w-4 h-4 text-amber-400" />
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end gap-3">
                <a
                  href="#contact"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, projectInterest: activeModalProject.title }));
                    setActiveModalProject(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  Book Private Site Visit
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Corporate Legacy & Pillars */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-3">
              The SLN Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              Crafting Sustainable Luxury with Uncompromising Integrity
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8 font-light">
              Since inception, SLN Groups has redefined urban horizons by uniting world-class architectural visionaries, IGBC green building benchmarks, and generational wealth preservation.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "100% Clear Titles & Statutory Governance",
                  desc: "Every SLN property features unencumbered legal titles, complete RERA registrations, and transparent documentation.",
                },
                {
                  icon: Award,
                  title: "IGBC Platinum Sustainable Construction",
                  desc: "Integrated solar energy grids, high-efficiency rainwater retention, and green concrete for enduring value.",
                },
                {
                  icon: Compass,
                  title: "Prime Strategic Growth Corridors",
                  desc: "Land parcels positioned in premier central financial districts and gated lifestyle zones guaranteeing exceptional appreciation.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[520px] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
              alt="SLN Estate Architecture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80">
              <p className="text-amber-400 font-bold text-sm">
                “We do not merely construct residences; we sculpt timeless monuments that empower families for centuries.”
              </p>
              <p className="text-xs text-slate-300 mt-2">— Founder & Chairman, SLN Groups</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Leadership Section */}
      <section id="leadership" className="py-24 bg-slate-900/50 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Visionary Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Executive Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "S. Lakshmi Narayana",
                role: "Founder & Chairman",
                bio: "Over three decades of pioneering stewardship in landmark real estate, urban infrastructure, and civic development across South India.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
              },
              {
                name: "Rajesh Varma",
                role: "Managing Director & CEO",
                bio: "Oversees group operations, global design partnerships, capital allocation, and sustainable architectural innovation.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
              },
            ].map((leader, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row gap-6 items-center shadow-xl backdrop-blur-md"
              >
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/30">
                  <Image src={leader.img} alt={leader.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{leader.name}</h3>
                  <p className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">{leader.role}</p>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Offices & Experience Centers */}
      <section id="branches" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
            Visit Our Gallerias
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Corporate Offices</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold mb-4">
              Corporate Headquarters
            </span>
            <h3 className="text-2xl font-black text-white mb-2">Jubilee Hills Corporate Tower</h3>
            <p className="text-xs text-slate-400 mb-6 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              SLN One Tower, 14th Floor, Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
            </p>
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400" /> +91 40 2345 6789
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400" /> info@slngroups.com
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400" /> Mon - Sat: 9:30 AM - 6:30 PM
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-4">
              Experience Galleria
            </span>
            <h3 className="text-2xl font-black text-white mb-2">Financial District Galleria</h3>
            <p className="text-xs text-slate-400 mb-6 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              Wave Rock Boulevard, Financial District, Gachibowli, Hyderabad, Telangana 500032
            </p>
            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-5">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400" /> +91 40 4567 8901
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400" /> experience.fd@slngroups.com
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400" /> Mon - Sun: 10:00 AM - 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Consultation Lead Booking Form */}
      <section id="contact" className="py-28 bg-gradient-to-b from-slate-900/90 to-slate-950 border-t border-slate-800/90 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Private Client Advisory
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Schedule a Private Consultation
            </h2>
            <p className="text-sm text-slate-400 mt-3 font-light">
              Connect with an SLN Senior Relationship Partner for private site walkthroughs and bespoke portfolio dossiers.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-slate-900/95 border border-amber-500/25 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative"
          >
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Consultation Confirmed</h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed mb-8 font-light">
                  Thank you for your interest in SLN Groups. Our Private Client Executive will reach out shortly with your tailored property dossier.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Development of Interest
                    </label>
                    <select
                      value={form.projectInterest}
                      onChange={(e) => setForm({ ...form, projectInterest: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm"
                    >
                      <option value="SLN Grandeur">SLN Grandeur (Financial District)</option>
                      <option value="SLN Eden Villas">SLN Eden Villas (Moinabad)</option>
                      <option value="SLN One Tower">SLN One Corporate Landmark (Jubilee Hills)</option>
                      <option value="General Consultation">General Portfolio Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Spatial Specifications & Walkthrough Date
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide your spatial requirements, preferred BHK configuration, or scheduled date..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-white text-sm resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    "Connecting with Private Desk..."
                  ) : (
                    <>
                      Submit Consultation Request <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              SLN
            </div>
            <div>
              <span className="text-sm font-bold tracking-wider text-slate-200 uppercase block">
                SLN Groups Real Estate & Developments
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider">
                Corporate Identification No. U45200TG2020PTC123456
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} SLN Groups. All rights reserved.</p>
            <p>RERA Approved | IGBC Platinum Partner | Telangana Real Estate Authority</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
