import { useState, useEffect, useRef } from "react";
import { AuthApi } from "../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OTP_LENGTH = 5;
const RESEND_DELAY = 60;

export const useOtp = (email: string) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_DELAY);
  const [error, setError] = useState("");
  const [loadingType, setLoadingType] = useState<"verify" | "resend" | null>(null);
  const navigate = useNavigate()

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
   const isAuthenticated = !!email; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true }); 
    }
  }, [isAuthenticated, navigate])

  // ⏱ Timer
  useEffect(() => {
    if (timer <= 0) return;

    const id = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timer]);

  const focusInput = (i: number) => inputsRef.current[i]?.focus();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();

    const chars = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    const next = [...otp];
    chars.forEach((c, i) => (next[i] = c));

    setOtp(next);
    focusInput(Math.min(chars.length, OTP_LENGTH - 1));
  };

  // 🔐 VERIFY
  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length < OTP_LENGTH) {
      setError("Please enter the complete code");
      return;
    }

    if (loadingType === "verify") return;

    try {
      setLoadingType("verify");

      const data = await AuthApi.otpVerification(email, code);
      toast.success(data.message);

      navigate('/login')
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingType(null);
    }
  };

  // 🔁 RESEND
  const resendOtp = async () => {
    if (loadingType === "resend") return;

    try {
      setLoadingType("resend");

      const data = await AuthApi.resendOtp(email);
      toast.success(data.message);

      setOtp(Array(OTP_LENGTH).fill(""));
      setError("");
      setTimer(RESEND_DELAY);
      focusInput(0);
    } finally {
      setLoadingType(null);
    }
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return {
    otp,
    error,
    timer,
    loadingType,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    verifyOtp,
    resendOtp,
    formatTime,
  };
};