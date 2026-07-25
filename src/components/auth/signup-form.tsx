"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not create your account.");
      setLoading(false);
      return;
    }

    // Auto sign-in after successful signup.
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (login?.error) {
      // Account created but auto-login failed — send them to log in manually.
      router.push("/login");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      {error ? (
        <p className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <Icon icon="mdi:alert-circle-outline" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">
          Full Name
        </label>
        <Input
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="David O."
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">
          Email
        </label>
        <Input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">
          Password
        </label>
        <Input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
