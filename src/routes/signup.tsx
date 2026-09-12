import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { signInWithGoogle, GoogleIcon } from "@/integrations/google/auth";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Get started — Northlight" },
      { name: "description", content: "Create a Northlight account and stage your first launch." },
      { property: "og:title", content: "Get started — Northlight" },
      { property: "og:description", content: "Create a Northlight account and stage your first launch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignUpPage,
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

function SignUpPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter your email and a password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setEmailSent(true);
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message || "Google sign-up failed.");
        return;
      }
    } catch (e) {
      toast.error("Google sign-up failed.");
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

        <div className="mt-10 rounded-[min(2.5vw,24px)] bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-2xl">
          {emailSent ? (
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-ink">Check your email</h2>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                We sent a confirmation link to <span className="font-medium text-ink">{email}</span>. Click it to finish
                creating your account.
              </p>
              <Link
                to="/signin"
                className="mt-6 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                Go to sign in
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-medium tracking-tight text-ink">Create your account</h1>
              <p className="mt-2 text-sm text-mute">Start staging launches on cue.</p>

              <form onSubmit={handleEmailSignUp} className="mt-8 space-y-4">
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
                    autoComplete="new-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl bg-white/60 px-4 py-3 text-sm text-ink ring-1 ring-black/10 placeholder:text-mute/60 focus:outline-none focus:ring-2 focus:ring-gold/60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cta-sheen w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isLoading ? "Creating account…" : "Get started"}
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
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white/40 py-3 text-sm font-medium text-ink ring-1 ring-black/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
              >
                <GoogleIcon />
                Sign in with Google
              </button>
            </>
          )}
        </div>

        {!emailSent && (
          <p className="mt-6 text-center text-sm text-mute">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-ink underline decoration-gold/50 underline-offset-4 transition-colors hover:decoration-gold"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
