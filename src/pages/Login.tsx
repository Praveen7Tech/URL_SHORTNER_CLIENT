import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AuthApi } from "../api/auth.api";
import { setCredentials } from "../app/slice/authSlice";
import { useDispatch } from "react-redux";
import { loginSchema, type LoginFormData } from "../validator/auth.schema";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await AuthApi.login(data);
      if(res){
         dispatch(setCredentials(res.user))
      }
      toast.success(res.message); 
      navigate("/home");
    } catch {
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/3 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">SnapLink</h1>
          <p className="text-muted-foreground mt-2 text-sm">Welcome back</p>
        </div>

        {/* Form */}
        <div className="glass rounded-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                {...register("email")}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:ring-2 focus:ring-primary/50 text-sm"
              />
              {errors.email && (
                <p className="text-destructive text-xs mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border pr-10 focus:ring-2 focus:ring-primary/50 text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-destructive text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              {isSubmitting ? "Signing in..." : "Sign In"}
            </motion.button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;