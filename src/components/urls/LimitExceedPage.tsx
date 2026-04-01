import { motion } from "framer-motion";
import { ShieldOff } from "lucide-react";

const AccessLimitPage = () => {

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full bg-destructive/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="glass rounded-2xl p-10 max-w-md w-full text-center mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 250 }}
          className="w-20 h-20 rounded-full bg-destructive/15 flex items-center justify-center mx-auto mb-6"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ShieldOff className="w-10 h-10 text-destructive" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold font-heading text-foreground mb-3"
        >
          Free Usage Limit Reached
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-sm mb-8 leading-relaxed"
        >
          You've used all your free link shortening quota. Upgrade to a premium plan to continue creating short links.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-3"
        >
          {/* <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-primary"
          >
            Upgrade Plan
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="w-full py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all text-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </motion.button> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccessLimitPage;
