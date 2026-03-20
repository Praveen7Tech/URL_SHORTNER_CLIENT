import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, RotateCcw } from "lucide-react";
import { useOtp } from "../hooks/useOtp";

const OtpPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  const {
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
  } = useOtp(email);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">Verify OTP</h1>
        </div>

        {/* Card */}
        <div className="rounded-xl p-8 border space-y-6">
          {/* Inputs */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                value={digit}
                disabled={loadingType !== null}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-12 h-14 text-center text-xl border rounded-lg"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-xs text-center">{error}</p>
          )}

          {/* Actions */}
          {timer > 0 ? (
            <>
              <button
                onClick={verifyOtp}
                disabled={loadingType === "verify"}
                className="w-full py-3 bg-primary text-white rounded-lg flex justify-center items-center gap-2"
              >
                {loadingType === "verify" && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {loadingType === "verify" ? "Verifying..." : "Verify"}
              </button>

              <p className="text-center text-sm">
                Resend in {formatTime(timer)}
              </p>
            </>
          ) : (
            <button
              onClick={resendOtp}
              disabled={loadingType === "resend"}
              className="w-full py-3 border rounded-lg flex justify-center items-center gap-2"
            >
              <RotateCcw
                className={loadingType === "resend" ? "animate-spin" : ""}
              />
              {loadingType === "resend" ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <p className="text-center mt-6 text-sm">
          <Link to="/login">Back to login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default OtpPage;