import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-bold text-primary mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground mb-6"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;