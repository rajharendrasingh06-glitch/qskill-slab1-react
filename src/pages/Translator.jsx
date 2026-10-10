
import { useState } from "react";
import {
  Languages,
  ArrowLeftRight,
  Copy,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

const languages = [
  ["es", "Spanish"],
  ["fr", "French"],
  ["de", "German"],
  ["hi", "Hindi"],
  ["ja", "Japanese"],
  ["it", "Italian"],
  ["pt", "Portuguese"],
  ["zh", "Chinese"],
  ["ar", "Arabic"],
  ["ko", "Korean"],
];

export default function Translator() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("hi");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  // Translate text using RapidAPI
  async function translateText() {
    setError("");
    setResult("");
    setCopied(false);

    const url = import.meta.env.VITE_TRANSLATE_API_URL;
    const key = import.meta.env.VITE_RAPIDAPI_KEY;
    const host = import.meta.env.VITE_RAPIDAPI_HOST;

    if (!source.trim()) {
      setError("Please enter English text to translate.");
      return;
    }

    if (source.trim().length > 2000) {
      setError("Text must not exceed 2,000 characters.");
      return;
    }

    if (!url || !key || !host) {
      setError(
        "RapidAPI is not configured. Check your .env.local file."
      );
      return;
    }

    setBusy(true);

    try {
      // RapidAPI request parameters
      const params = new URLSearchParams({
        query: source.trim(),
        to: target,
        from: "en",
      });

      // Use the exact endpoint URL from your RapidAPI Code Snippet.
      // This version sends parameters in the URL.
      const separator = url.includes("?") ? "&" : "?";
      const endpoint = `${url}${separator}${params.toString()}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": host,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error?.message ||
            `Translation failed (${response.status}).`
        );
      }

      // API response confirmed in your test
      const translated = data?.translation;

      if (
        typeof translated !== "string" ||
        !translated.trim()
      ) {
        console.error("Unexpected API response:", data);
        throw new Error(
          "Translation not found. Check the API response format."
        );
      }

      setResult(translated.trim());
    } catch (err) {
      console.error("Translation error:", err);

      if (err instanceof TypeError) {
        setError(
          "Unable to connect. Check the API endpoint, internet connection and CORS settings."
        );
      } else {
        setError(
          err.message || "Translation failed. Please try again."
        );
      }
    } finally {
      setBusy(false);
    }
  }

  // Copy translated text
  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Copy error:", err);
      setError("Unable to copy. Please copy the text manually.");
    }
  }

  // Clear translator
  function clearForm() {
    setSource("");
    setResult("");
    setError("");
    setCopied(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page heading */}
      <div>
        <p className="eyebrow">TASK 01 / TRANSLATION</p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Text <span className="text-cyan-300">Translator</span>
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Translate English text into your chosen language
          using the Google Translator API on RapidAPI.
        </p>
      </div>

      {/* Translation workspace */}
      <section className="panel p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Languages className="text-cyan-300" size={18} />
            Translation workspace
          </div>

          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
            English
            <ArrowLeftRight className="mx-1 inline" size={12} />
            Target language
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* English input */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="english-input"
                className="text-sm font-semibold"
              >
                English input
              </label>

              <span className="text-xs text-slate-500">
                {source.length}/2000
              </span>
            </div>

            <textarea
              id="english-input"
              className="field min-h-52 resize-y"
              maxLength={2000}
              placeholder="Type or paste the English text you want to translate..."
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setError("");
              }}
              disabled={busy}
            />

            <p className="mt-2 text-xs text-slate-500">
              Enter up to 2,000 characters.
            </p>
          </div>

          {/* Translation output */}
          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label
                htmlFor="target-language"
                className="text-sm font-semibold"
              >
                Translate to
              </label>

              <select
                id="target-language"
                className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-sm outline-none focus:border-cyan-300/50"
                value={target}
                onChange={(e) => {
                  setTarget(e.target.value);
                  setResult("");
                  setError("");
                  setCopied(false);
                }}
                disabled={busy}
              >
                {languages.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div
              className="min-h-52 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-7 text-slate-200"
              aria-live="polite"
              aria-busy={busy}
            >
              {busy ? (
                <span className="flex items-center gap-2 text-cyan-300">
                  <LoaderCircle
                    className="animate-spin"
                    size={16}
                  />
                  Translating your text...
                </span>
              ) : result ? (
                result
              ) : (
                <span className="text-slate-600">
                  Your translation will appear here...
                </span>
              )}
            </div>

            <div className="mt-2 flex justify-end">
              <button
                type="button"
                disabled={!result || busy}
                onClick={copyResult}
                className="secondary-btn !px-3 !py-2 text-xs"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy translation"}
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-sm text-rose-200"
          >
            {error}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className="primary-btn inline-flex"
            onClick={translateText}
            disabled={busy || !source.trim()}
          >
            {busy ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
              />
            ) : (
              <Languages size={16} />
            )}

            {busy ? "Translating..." : "Translate text"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={clearForm}
            disabled={busy}
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </div>
      </section>

      {/* API configuration note */}
      <p className="text-xs leading-5 text-slate-500">
        API setup: configure your RapidAPI endpoint, API key
        and host in .env.local. This integration sends the
        query, to and from parameters and reads the translation
        field from the API response.
      </p>
    </div>
  );
}