import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link2, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const LandingPage = () => {
  const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse-glow"
        >
          <Link2 className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold font-heading">
          <span className="gradient-text">SnapLink</span>
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          The fastest way to shorten, share and track your links.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm glow-primary hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          {!isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 border border-border text-foreground rounded-lg font-semibold text-sm hover:border-primary/40 transition-all"
          >
            Sign In
          </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
