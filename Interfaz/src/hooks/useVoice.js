export function useVoice() {
    const speak = (texto) => {
        const utterance = new SpeechSynthesisUtterance(texto || "")
        const voices = speechSynthesis.getVoices()
        utterance.voice = voices[1];
        speechSynthesis.speak(utterance);
    }
    return [speak]
}