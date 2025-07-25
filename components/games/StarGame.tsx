"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Plus, X, Sparkles, Moon } from "lucide-react";

interface GratitudeStar {
  id: number;
  x: number;
  y: number;
  gratitude: string;
  size: number;
  hue: number;
  brightness: number;
  createdAt: number;
}

interface BackgroundStar {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
}

interface Position {
  x: number;
  y: number;
}

interface ModalPosition {
  x: number;
  y: number;
}

const GratitudeConstellation: React.FC = () => {
  const [stars, setStars] = useState<GratitudeStar[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [gratitudeText, setGratitudeText] = useState<string>("");
  const [clickPosition, setClickPosition] = useState<Position>({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    x: 0,
    y: 0,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Storage keys
  const STORAGE_KEYS = {
    STARS: "gratitude_constellation_stars",
    WELCOME_SHOWN: "gratitude_constellation_welcome_shown",
    MUSIC_PREFERENCE: "gratitude_constellation_music_preference",
  };

  // Sample celestial background music (you can replace with actual audio file)
  const audioUrl =
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEeByeHzvLZizoIFmu+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHWq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSJ+yO/eizEIHmq+7+OZSA0PVqzn8bllHgU2jdXzzn0vBSF+yO/eizEIHQ==";

  // Generate twinkling background stars
  const generateBackgroundStars = (): BackgroundStar[] => {
    const backgroundStars: BackgroundStar[] = [];
    for (let i = 0; i < 50; i++) {
      backgroundStars.push({
        id: `bg-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleDelay: Math.random() * 4,
      });
    }
    return backgroundStars;
  };

  const [backgroundStars] = useState<BackgroundStar[]>(generateBackgroundStars);

  // Load data from localStorage on component mount
  useEffect(() => {
    const loadPersistedData = () => {
      try {
        // Load stars
        const savedStars = localStorage.getItem(STORAGE_KEYS.STARS);
        if (savedStars) {
          const parsedStars: GratitudeStar[] = JSON.parse(savedStars);
          setStars(parsedStars);
        }

        // Load welcome modal preference
        const welcomeShown = localStorage.getItem(STORAGE_KEYS.WELCOME_SHOWN);
        if (welcomeShown === "true") {
          setShowWelcome(false);
        }

        // Load music preference
        const musicPreference = localStorage.getItem(
          STORAGE_KEYS.MUSIC_PREFERENCE
        );
        if (musicPreference === "true") {
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error loading persisted data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadPersistedData();
  }, []);

  // Save stars to localStorage whenever stars change
  useEffect(() => {
    if (!isLoaded) return; // Don't save during initial load

    try {
      localStorage.setItem(STORAGE_KEYS.STARS, JSON.stringify(stars));
    } catch (error) {
      console.error("Error saving stars:", error);
    }
  }, [stars, isLoaded]);

  // Save welcome modal state
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEYS.WELCOME_SHOWN,
        showWelcome ? "false" : "true"
      );
    } catch (error) {
      console.error("Error saving welcome preference:", error);
    }
  }, [showWelcome, isLoaded]);

  // Save music preference
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEYS.MUSIC_PREFERENCE, isPlaying.toString());
    } catch (error) {
      console.error("Error saving music preference:", error);
    }
  }, [isPlaying, isLoaded]);

  // Calculate safe modal position
  const calculateModalPosition = (
    clickX: number,
    clickY: number,
    containerRect: DOMRect
  ) => {
    const modalWidth = 300; // minWidth of modal
    const modalHeight = 200; // approximate height of modal

    let x = clickX;
    let y = clickY;

    // Adjust horizontal position
    if (clickX < 25) {
      // Too close to left edge - position modal to the right
      x = Math.max(20, (modalWidth / 2 / containerRect.width) * 100);
    } else if (clickX > 75) {
      // Too close to right edge - position modal to the left
      x = Math.min(80, 100 - (modalWidth / 2 / containerRect.width) * 100);
    }

    // Adjust vertical position
    if (clickY < 20) {
      // Too close to top edge - position modal below
      y = Math.max(15, (modalHeight / 2 / containerRect.height) * 100);
    } else if (clickY > 80) {
      // Too close to bottom edge - position modal above
      y = Math.min(85, 100 - (modalHeight / 2 / containerRect.height) * 100);
    }

    return { x, y };
  };

  // Handle sky click to add new gratitude star
  const handleSkyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showInput) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Calculate safe position for modal
    const safePosition = calculateModalPosition(clickX, clickY, rect);

    setClickPosition({ x: clickX, y: clickY }); // Star position (original click)
    setModalPosition(safePosition); // Modal position (adjusted for visibility)
    setShowInput(true);
  };

  // Add new gratitude star
  const addGratitudeStar = () => {
    if (!gratitudeText.trim()) return;

    const newStar: GratitudeStar = {
      id: Date.now(),
      x: clickPosition.x,
      y: clickPosition.y,
      gratitude: gratitudeText.trim(),
      size: Math.random() * 1.5 + 2,
      hue: Math.random() * 60 + 200, // Blue to purple range
      brightness: Math.random() * 0.3 + 0.7,
      createdAt: Date.now(),
    };

    setStars((prev) => [...prev, newStar]);
    setGratitudeText("");
    setShowInput(false);
  };

  // Cancel adding star
  const cancelInput = () => {
    setShowInput(false);
    setGratitudeText("");
  };

  // Clear all stars (with confirmation)
  const clearAllStars = () => {
    if (stars.length === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to clear all ${stars.length} gratitude stars? This action cannot be undone.`
    );

    if (confirmed) {
      setStars([]);
      try {
        localStorage.removeItem(STORAGE_KEYS.STARS);
      } catch (error) {
        console.error("Error clearing stars from storage:", error);
      }
    }
  };

  // Export stars as JSON
  const exportStars = () => {
    if (stars.length === 0) {
      alert("No stars to export!");
      return;
    }

    const dataStr = JSON.stringify(stars, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `gratitude-constellation-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Remove star
  const removeStar = (id: number) => {
    setStars((prev) => prev.filter((star) => star.id !== id));
  };

  // Toggle background music
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle input key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addGratitudeStar();
    } else if (e.key === "Escape") {
      cancelInput();
    }
  };

  // Draw constellation lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stars.length < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(147, 197, 253, 0.3)";
    ctx.lineWidth = 1;

    // Draw lines between nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const star1 = stars[i];
        const star2 = stars[j];

        const dx = star1.x - star2.x;
        const dy = star1.y - star2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 25) {
          // Connect stars within 25% distance
          const x1 = (star1.x / 100) * canvas.width;
          const y1 = (star1.y / 100) * canvas.height;
          const x2 = (star2.x / 100) * canvas.width;
          const y2 = (star2.y / 100) * canvas.height;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
  }, [stars]);

  // Add this inside your component before the return statement
  const importStars = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === "string") {
          const importedStars: GratitudeStar[] = JSON.parse(result);

          // Optional: validate each star (basic check)
          if (Array.isArray(importedStars)) {
            setStars(importedStars);
            alert("Stars imported successfully!");
          } else {
            alert("Invalid star data format.");
          }
        }
      } catch (error) {
        console.error("Error importing stars:", error);
        alert("Failed to import stars. Make sure it's a valid file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="relative w-full h-[400px] bg-gradient-to-b from-indigo-950 via-purple-900 to-slate-900 overflow-hidden">
        {/* Background Audio */}
        <audio ref={audioRef} loop>
          <source src={audioUrl} type="audio/wav" />
        </audio>

        {/* Welcome Modal */}
        {showWelcome && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-8 max-w-md mx-4 text-center border border-blue-300/20">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Gratitude Constellation
              </h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Create your personal constellation by clicking anywhere on the
                night sky and sharing what you&apos;re grateful for. Watch as
                your gratitude forms beautiful star patterns.
              </p>
              <button
                onClick={() => setShowWelcome(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full transition-colors duration-200 font-medium"
              >
                Begin Journey
              </button>
            </div>
          </div>
        )}

        {/* Background Stars */}
        {backgroundStars.map((star) => (
          <div
            key={star.id}
            className="absolute animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.twinkleDelay}s`,
            }}
          >
            <div className="w-full h-full bg-white rounded-full shadow-sm"></div>
          </div>
        ))}

        {/* Constellation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Interactive Sky Area */}
        <div
          className="absolute inset-0 cursor-crosshair"
          onClick={handleSkyClick}
          role="button"
          tabIndex={0}
          aria-label="Click to add a gratitude star"
        >
          {/* Gratitude Stars */}
          {stars.map((star, index) => (
            <div
              key={star.id}
              className="absolute group"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: "translate(-50%, -50%)",
                animation: `starAppear 0.8s ease-out ${index * 0.2}s both`,
              }}
            >
              {/* Star */}
              <div
                className="relative cursor-pointer animate-pulse hover:scale-110 transition-transform duration-200"
                style={{
                  filter: `hue-rotate(${star.hue}deg) brightness(${star.brightness})`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Star
                  className="w-6 h-6 text-blue-300 fill-current drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 8px currentColor)",
                  }}
                />
              </div>

              {/* Gratitude Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-slate-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm max-w-48 text-center border border-blue-300/20">
                  {star.gratitude}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800/90"></div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeStar(star.id);
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-400 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs"
                aria-label="Remove star"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Input Modal */}
          {showInput && (
            <div
              className="fixed bg-slate-800/95 backdrop-blur-md rounded-2xl p-6 border border-blue-300/20 shadow-2xl z-50"
              style={{
                left: `${modalPosition.x}%`,
                top: `${modalPosition.y}%`,
                transform: "translate(-50%, -50%)",
                minWidth: "300px",
                maxWidth: "400px",
                animation: "modalAppear 0.3s ease-out",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Connection indicator - only show if significantly repositioned */}
              {(Math.abs(modalPosition.x - clickPosition.x) > 10 ||
                Math.abs(modalPosition.y - clickPosition.y) > 10) && (
                <div
                  className="absolute w-1 h-1 bg-blue-300/60 rounded-full animate-pulse"
                  style={{
                    left: `${
                      (clickPosition.x - modalPosition.x) *
                        (window.innerWidth / 100) +
                      150
                    }px`,
                    top: `${
                      (clickPosition.y - modalPosition.y) *
                        (window.innerHeight / 100) +
                      100
                    }px`,
                  }}
                >
                  {/* Small arrow pointing to click location */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-300/40 rounded-full animate-ping"></div>
                  </div>
                </div>
              )}

              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-300" />
                What are you grateful for?
              </h3>
              <textarea
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="I'm grateful for..."
                className="w-full h-20 p-3 bg-slate-700/50 border border-blue-300/20 rounded-lg text-white placeholder-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                autoFocus
                maxLength={100}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addGratitudeStar}
                  disabled={!gratitudeText.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Star
                </button>
                <button
                  onClick={cancelInput}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-blue-200 mt-2">
                Press Enter to add, Escape to cancel
              </p>

              {/* Subtle text indicator when repositioned */}
              {(Math.abs(modalPosition.x - clickPosition.x) > 10 ||
                Math.abs(modalPosition.y - clickPosition.y) > 10) && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    Star will appear at click location ⭐
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions */}
        {stars.length === 0 && !showWelcome && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-blue-200 text-lg animate-bounce">
              ✨ Click anywhere on the sky to add your first gratitude star ✨
            </p>
          </div>
        )}

        {/* Stats */}
        {stars.length > 0 && (
          <div className="absolute bottom-6 right-6 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-300/20">
            <span className="text-blue-300 font-medium">
              {stars.length} {stars.length === 1 ? "Star" : "Stars"} ⭐
            </span>
          </div>
        )}

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 text-center border border-blue-300/20">
              <div className="animate-spin w-8 h-8 border-2 border-blue-300 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-blue-200">Loading your constellation...</p>
            </div>
          </div>
        )}

        {/* Custom Styles */}
        <style jsx>{`
          @keyframes starAppear {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0) rotate(0deg);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1) rotate(360deg);
            }
          }

          @keyframes modalAppear {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </div>

      {/* Header */}
      <div className="flex justify-center items-center">
        {/* <div className="flex items-center gap-3">
          <Moon className="w-8 h-8 text-blue-300" />
          <h1 className="text-2xl font-bold text-white">
            Gratitude Constellation
          </h1>
        </div> */}

        <div className="flex items-center gap-3">
          {/* Clear All Button */}
          {stars.length > 0 && (
            <button
              onClick={clearAllStars}
              className="bg-red-600/50 backdrop-blur-sm hover:bg-red-500/50 text-red-200 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 border border-red-300/20 text-sm font-medium"
              title="Clear all stars"
            >
              Clear All
            </button>
          )}

          {/* Export Button */}
          {stars.length > 0 && (
            <button
              onClick={exportStars}
              className="bg-green-600/50 backdrop-blur-sm hover:bg-green-500/50 text-green-200 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 border border-green-300/20 text-sm font-medium"
              title="Export constellation"
            >
              Export
            </button>
          )}

          {/* Import Button */}
          <label className="bg-purple-600/50 backdrop-blur-sm hover:bg-purple-500/50 text-purple-200 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 border border-purple-300/20 text-sm font-medium cursor-pointer">
            Import
            <input
              type="file"
              accept=".json"
              onChange={importStars}
              className="hidden"
            />
          </label>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-blue-300 p-3 rounded-full transition-colors duration-200 border border-blue-300/20"
            aria-label={isPlaying ? "Mute music" : "Play music"}
          >
            {isPlaying ? "🔊" : "🔇"}
          </button>
        </div>
      </div>
    </>
  );
};

export default GratitudeConstellation;
