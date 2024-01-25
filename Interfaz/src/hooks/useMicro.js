import { useCallback, useEffect, useState } from "react";

const recognition = new webkitSpeechRecognition();

export function useMicro() {
    const [result, setResult] = useState("")
    const [isActive, setIsActive] = useState(false)

    const activar = () => {recognition.start(); setIsActive(true)}
    const desactivar = () => {recognition.stop(); setIsActive(false)}
    
    recognition.onresult = useCallback((e) => {
        setResult(e.results[e.results.length - 1][0].transcript)
    })

    recognition.onerror = useCallback((e) => {
        console.log(e);
    })

    useEffect(() => {
        recognition.continuous = false;
        recognition.lang = 'es-ES';
        recognition.interimResults = false;
        return () => {
            console.log("abort");
            recognition.abort()
        }
    }, [])
    return [activar, desactivar, result, isActive]
}