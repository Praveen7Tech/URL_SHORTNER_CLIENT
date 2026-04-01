import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Copy, Check, LogOut, Scissors } from "lucide-react";
import { UrlApi } from "../api/urls.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../app/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../api/auth.api";
import LinkHistory from "../components/urls/LinkHistory";
import { useLinkHistory } from "../hooks/useLinkHistory";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { links, page, setPage, totalPages, refreshLinks } = useLinkHistory();

  // Validate URL
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // Handle shorten
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // const formattedUrl = normalizeUrl(url);

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL with ('https://')");
      return;
    }

    try {
      const res = await UrlApi.createShortUrl({ url });
      setShortUrl(res.shortUrl);
      toast.success("URL shortened successfully");
      refreshLinks();
    } catch {
      // handled globally
    }
  };

  //  Copy
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset
  const handleReset = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);
    setError("");
  };

  // Logout
  const handleLogout = async () => {
    const res = await AuthApi.logout();
    dispatch(logout());
    navigate("/");
    toast.success(res.message);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto"
      >
        <h1 className="text-xl font-bold font-heading gradient-text">
          SnapLink
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
      </motion.header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
          >
            <Scissors className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground">
            Shorten Your <span className="gradient-text">Links</span>
          </h2>

          <p className="text-muted-foreground mt-3 text-base max-w-md mx-auto">
            Paste your long URL and get a clean, shareable short link instantly.
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl"
        >
          <form
            onSubmit={handleShorten}
            className="glass rounded-xl p-2 flex gap-2"
          >
            <div className="flex-1 flex items-center gap-3 px-3">
              <Link2 className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={url}
                disabled={!!shortUrl}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                placeholder="Paste your long URL here..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none py-3 text-sm disabled:opacity-50"
              />
            </div>

            {/* ✅ Conditional Button */}
            {!shortUrl ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm glow-primary hover:opacity-90 transition-all shrink-0"
              >
                Shorten
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-secondary text-foreground rounded-lg font-semibold text-sm border border-border hover:border-primary/50 transition-all shrink-0"
              >
                Create Another
              </motion.button>
            )}
          </form>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-xs mt-2 ml-2"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {shortUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mt-8 w-full max-w-xl glass rounded-xl p-6"
            >
              <p className="text-xs text-muted-foreground mb-2">
                Your shortened URL
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-secondary rounded-lg">
                  <p className="text-primary font-medium text-sm truncate">
                    {shortUrl}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="px-4 py-3 rounded-lg border border-border hover:border-primary/50 transition-all flex items-center gap-2 text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-primary">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <LinkHistory
          links={links}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
};

export default HomePage;