"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push(callbackUrl);
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
