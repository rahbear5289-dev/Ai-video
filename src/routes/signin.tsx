import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
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

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
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
      navigate({ to: "/", replace: true });
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
    navigate({ to: "/", replace: true });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    setIsLoading(false);
    if (result.error) {
      toast.error(result.error.message || "Google sign-in failed.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/", replace: true });
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

        <div className="mt-10 rounded-[min(2.5vw,24px)] bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-2xl">
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
                className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
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
                className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
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
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white/70 py-3 text-sm font-semibold text-ink ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            <GoogleIcon />
            Continue with Google
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
