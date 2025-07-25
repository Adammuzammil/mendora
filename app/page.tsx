"use client";

import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  HeartPulse,
  Lightbulb,
  Lock,
  MessageSquareHeart,
  Waves,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const emotions = [
  { value: 0, label: "😔 Down", color: "from-blue-500/50" },
  { value: 25, label: "😊 Content", color: "from-green-500/50" },
  { value: 50, label: "😌 Peaceful", color: "from-purple-500/50" },
  { value: 75, label: "🤗 Happy", color: "from-yellow-500/50" },
  { value: 100, label: "✨ Excited", color: "from-pink-500/50" },
];

const features = [
  {
    icon: HeartPulse,
    title: "24/7 Support",
    description: "Always here to listen and support you, any time of day",
    color: "from-rose-500/20",
    delay: 0.2,
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Personalized guidance powered by emotional intelligence",
    color: "from-amber-500/20",
    delay: 0.4,
  },
  {
    icon: Lock,
    title: "Private & Secure",
    description: "Your conversations are always confidential and encrypted",
    color: "from-emerald-500/20",
    delay: 0.6,
  },
  {
    icon: MessageSquareHeart,
    title: "Evidence-Based",
    description: "Therapeutic techniques backed by clinical research",
    color: "from-blue-500/20",
    delay: 0.8,
  },
];

const Home = () => {
  const [emotion, setEmotion] = useState<number>(22);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out
            bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"></div>
          </div>
        </div>
        <Ripple className="opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-primary dark:border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="">Embrace Calm, One Emotion at a Time</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]  transition-all duration-300">
              Tune Into
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              Your Emotions
            </span>
          </h1>

          <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
            Mendora is your AI-powered mental wellness guide — helping you
            understand, track, and gently reflect on your emotions. Start your
            journey to a more mindful and emotionally balanced life.
          </p>

          {/* Emotional Slider */}
          <motion.div
            className="w-ful max-w-[600px] mx-auto space-y-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <p>Let us know how you're feeling today</p>
              <div className="flex justify-between items-center px-4">
                {emotions.map((em) => (
                  <div
                    key={em.value}
                    className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                      Math.abs(emotion - em.value) < 15
                        ? "opacity-100 scale-110 transform-gpu"
                        : "opacity-50 scale-100"
                    }`}
                    onClick={() => setEmotion(em.value)}
                  >
                    <div className="text-2xl transform-gpu">
                      {em.label.split(" ")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-medium">
                      {em.label.split(" ")[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div>
              <div>
                <Slider
                  value={[emotion]}
                  onValueChange={(value) => setEmotion(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Slide to express how you're feeling today
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Button className="relative group h-12 px-8 rounded-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:to-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30 hover:transition-shadow hover:duration-300">
              <span className="flex items-center">
                Begin Your Journey
                <ArrowRight />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 bg-pos-0 group-hover:bg-pos-100" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4 text-white">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:text-primary/90">
              How Mendora Helps You
            </h2>
            <p className="text-foreground dark:text-foreground/95 max-w-2xl mx-auto font-medium text-lg">
              Mendora is designed to gently guide you through your emotional
              landscape, helping you understand and reflect on your feelings
              with compassion and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h-[200px] bg-card/30 dark:bg-card/80 backdrop-blur-sm">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 dark:group-hover:opacity-30`}
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-primary dark:text-primary/90" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-foreground/90 dark:text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
