import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { signInWithGoogle, GoogleIcon } from "@/integrations/google/auth";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Northlight" },
      { name: "description", content: "Sign in to Northlight to stage your next launch." },
      { property: "og:title", content: "Sign in — Northlight" },
      { property: "og:description", content: "Sign in to Northlight to stage your next launch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignInPage,
});

function NorthlightLogo() {
  return (
    <Link to="/" className="group flex items-center justify-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="7" cy="7" r="2.5" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">Northlight</span>
    </Link>
  );
}

function SignInPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || "Google sign-in failed.");
        return;
      }
    } catch (e) {
      toast.error("Google sign-in failed.");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <div className="size-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-paper font-body">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[120vh] w-[160vw] -translate-x-1/2 opacity-60"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 42%, rgba(207,152,54,0.18) 0%, rgba(243,239,231,0) 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-20">
        <div className="mx-auto">
          <NorthlightLogo />
        </div>

        <div className="rise-in mt-10 rounded-[min(2.5vw,24px)] bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-2xl">
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">Welcome back</h1>
          <p className="mt-2 text-sm text-mute">Sign in to continue staging your launch.</p>

          <form onSubmit={handleEmailSignIn} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-field w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
                style={{ animationDelay: "80ms" }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-field w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
                style={{ animationDelay: "140ms" }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="cta-sheen w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10" />
            </div>
            <div className="relative flex justify-center text-[11px] font-medium uppercase tracking-[0.2em] text-mute">
              <span className="bg-white/40 px-2">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white/40 py-3 text-sm font-medium text-ink ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-mute">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold"
          >
            Get started
          </Link>
        </p>
      </div>
    </main>
  );
}
