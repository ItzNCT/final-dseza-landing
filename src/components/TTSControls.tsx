import React, { useState, useEffect } from 'react';
import { Volume2, Pause } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TTSControlsProps {
  textToSpeak: string;
}

const TTSControls: React.FC<TTSControlsProps> = ({ textToSpeak }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const getVoices = () => {
      const voiceList = synth.getVoices();
      const desiredPrefix = (language === 'vi' ? 'vi' : 'en');
      const preferred = voiceList.filter(v => v.lang?.toLowerCase().startsWith(desiredPrefix));
      const listToUse = preferred.length > 0 ? preferred : voiceList;
      setVoices(listToUse);
      // Keep current selection if still available; otherwise pick first matching voice
      if (selectedVoice && listToUse.some(v => v.voiceURI === selectedVoice.voiceURI)) {
        setSelectedVoice(selectedVoice);
      } else if (listToUse.length > 0) {
        setSelectedVoice(listToUse[0]);
      } else {
        setSelectedVoice(null);
      }
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = getVoices;
    }
    getVoices();
    // Re-evaluate available voices when UI language changes
  }, [synth, language]);
  
  const handleSpeak = () => {
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    if (textToSpeak && !synth.speaking) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        if (selectedVoice.lang) {
          utterance.lang = selectedVoice.lang;
        }
      }
      if (!utterance.lang) {
        utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Stop speaking when this component unmounts (e.g., navigating away)
  useEffect(() => {
    return () => {
      try {
        synth.cancel();
      } catch {
        // ignore
      }
    };
  }, []);

  const handleVoiceChange = (voiceURI: string) => {
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  if (!('speechSynthesis' in window)) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 p-3 rounded-lg border ${
      theme === 'dark' 
        ? 'bg-dseza-dark-secondary-bg border-dseza-dark-border' 
        : 'bg-dseza-light-secondary-bg border-dseza-light-border'
    }`}>
      <Button onClick={handleSpeak} size="sm">
        {isSpeaking ? (
          <>
            <Pause className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Stop' : 'Dừng đọc'}
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Listen' : 'Nghe bài viết'}
          </>
        )}
      </Button>
      <Select onValueChange={handleVoiceChange} value={selectedVoice?.voiceURI}>
        <SelectTrigger className="w-auto h-9 text-xs">
          <SelectValue placeholder={language === 'en' ? 'Select voice' : 'Chọn giọng đọc'} />
        </SelectTrigger>
        <SelectContent>
          {voices.map((voice) => (
            <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name} ({voice.lang})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TTSControls;


