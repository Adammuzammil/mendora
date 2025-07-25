"use client";

import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Sound = {
  name: string;
  file: string;
};

interface SoundMixerProps {
  isOpen: boolean;
}

const sounds: Sound[] = [
  { name: "Rain", file: "/sounds/rain.mp3" },
  { name: "Ocean", file: "/sounds/ocean.mp3" },
  { name: "Forest", file: "/sounds/forest.mp3" },
];

const SoundMixer: React.FC<SoundMixerProps> = ({ isOpen }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferRefs = useRef<Record<string, AudioBuffer>>({});
  const sourceRefs = useRef<Record<string, AudioBufferSourceNode | null>>({});
  const gainRefs = useRef<Record<string, GainNode>>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordedURL, setRecordedURL] = useState<string | null>(null);
  const [filename, setFilename] = useState("my-mix");

  // Initialize context & load sounds
  useEffect(() => {
    const setup = async () => {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      for (const sound of sounds) {
        const res = await fetch(sound.file);
        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        bufferRefs.current[sound.name] = audioBuffer;

        const gain = ctx.createGain();
        gain.gain.value = 0.5;
        gain.connect(ctx.destination);
        gainRefs.current[sound.name] = gain;

        sourceRefs.current[sound.name] = null;

        setVolumes((prev) => ({ ...prev, [sound.name]: 0.5 }));
        setActive((prev) => ({ ...prev, [sound.name]: false }));
      }
    };

    setup();
  }, []);

  const playSound = (name: string) => {
    const ctx = audioContextRef.current;
    const buffer = bufferRefs.current[name];
    const gain = gainRefs.current[name];
    if (!ctx || !buffer || !gain) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    source.start();

    sourceRefs.current[name] = source;
  };

  const stopSound = (name: string) => {
    const source = sourceRefs.current[name];
    if (source) {
      try {
        source.stop();
      } catch {}
    }
    sourceRefs.current[name] = null;
  };

  const toggleSound = (name: string, isOn: boolean) => {
    setActive((prev) => ({ ...prev, [name]: isOn }));
    if (isOn) {
      playSound(name);
    } else {
      stopSound(name);
    }
  };

  const handleVolumeChange = (name: string, value: number[]) => {
    const vol = value[0];
    setVolumes((prev) => ({ ...prev, [name]: vol }));
    if (gainRefs.current[name]) {
      gainRefs.current[name]!.gain.value = vol;
    }
  };

  const startRecording = () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const dest = ctx.createMediaStreamDestination();

    for (const gain of Object.values(gainRefs.current)) {
      gain.connect(dest);
    }

    const mediaRecorder = new MediaRecorder(dest.stream);
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedURL(url);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Stop all audio when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      sounds.forEach((s) => stopSound(s.name));
    }
  }, [isOpen]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🎧 Ambient Sound Mixer
      </h2>

      {sounds.map((sound) => (
        <div key={sound.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-lg">{sound.name}</Label>
            <Switch
              checked={active[sound.name]}
              onCheckedChange={(isOn) => toggleSound(sound.name, isOn)}
            />
          </div>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[volumes[sound.name] || 0]}
            onValueChange={(value) => handleVolumeChange(sound.name, value)}
          />
        </div>
      ))}

      <div className="flex flex-col gap-3 items-center pt-4">
        <Button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "⏹ Stop & Save" : "🔴 Start Recording"}
        </Button>

        <div className="w-full pt-4">
          <Label htmlFor="filename" className="text-sm mb-1 block">
            Enter file name
          </Label>
          <input
            id="filename"
            type="text"
            className="w-full px-3 py-2 rounded-md border bg-transparent text-sm dark:text-white"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="e.g. relaxing-ocean"
          />
        </div>

        {recordedURL && (
          <a
            href={recordedURL}
            download={`${filename.trim() || "my-mix"}.webm`}
            className="text-sm text-blue-600 dark:text-blue-400 underline"
          >
            🎵 Download "{filename.trim() || "my-mix"}"
          </a>
        )}
      </div>
    </div>
  );
};

export default SoundMixer;
