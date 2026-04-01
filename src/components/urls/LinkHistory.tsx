import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import { useState } from "react";
import type { History } from "../../api/urls.api";
interface Props {
  links: History[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const LinkHistory = ({ links, page, setPage, totalPages }: Props) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full max-w-3xl mt-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold font-heading text-foreground">
          Your Links
        </h3>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_160px_70px_120px_90px] gap-4 px-5 py-3 border-b border-border/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span>Original URL</span>
          <span>Short Link</span>
          <span className="text-center">Clicks</span>
          <span className="text-center">Created</span>
          <span className="text-right">Action</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[1fr_160px_70px_120px_90px] gap-4 px-5 py-4 items-center border-b border-border/20 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                {/* Original URL */}
                <div className="flex items-center gap-2 min-w-0">
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground/80 truncate">
                    {link.originalUrl}
                  </span>
                </div>

                {/* Short URL */}
                <span className="text-sm text-primary font-medium truncate">
                  {link.shortUrl.replace("https://", "")}
                </span>

                {/* ✅ FIXED CONDITION ONLY */}
                <span
                  className={`text-sm text-center font-semibold ${
                    link.clicks >= 2 ? "text-red-500" : "text-foreground"
                  }`}
                >
                  {link.clicks}
                </span>

                {/* Created */}
                <span className="text-xs text-center text-muted-foreground">
                  {new Date(link.createdAt).toLocaleDateString()}
                </span>

                {/* Copy */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleCopy(link.id, link.shortUrl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border hover:border-primary/50 text-xs transition-all"
                  >
                    {copiedId === link.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span className="text-primary">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination — UNCHANGED */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-border hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <motion.button
                key={p}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-md text-xs font-medium transition-all ${
                  p === page
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "border border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {p}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-border hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LinkHistory;