import { parse } from "https://deno.land/std@0.133.0/flags/mod.ts";

export function log(msg: string): void {
  const encoder = new TextEncoder();
  Deno.stdout.writeSync(encoder.encode(`${msg}\n`));
}

export function buildMagnetLink(
  hash: string,
  trackers: string[],
  name?: string
): string {
  let url = `magnet:?xt=urn:btih:${hash}`;

  if (name) {
    url += `&dn=${encodeURIComponent(name)}`;
  }

  for (const tracker of trackers) {
    url += `&tr=${tracker}`;
  }

  return url;
}

export function validateBitTorrentHash(hash: string): void {
  // hex-encoded SHA-1 hash
  if (typeof hash !== "string") throw new Error("Hash must be a string");
  if (hash.length !== 40) throw new Error("Wrong hash length");
  if (hash.match(/[^a-f0-9]/i)) throw new Error("Invalid hash values");
}

export function validateTrackerResponse(trackers: string): void {
  if (typeof trackers !== "string") {
    throw new Error("API response MUST be a string");
  }

  if (/(?:udp:|http:)/.test(trackers) === false) {
    throw new Error("API response MUST contain a least one URL");
  }
}

export function parseResponseText(trackerTextList: string): string[] {
  const trackers = trackerTextList
    .split("\n")
    .map((tracker) => tracker.trim())
    .filter(Boolean);

  return trackers;
}

export async function getTrackers(): Promise<string[]> {
  const TRACKER_API_URL = "https://newtrackon.com/api/stable";

  const result = await fetch(TRACKER_API_URL);

  if (!result.ok) {
    throw new Error(`Bad response from API: ${result.status}`);
  }

  const trackerTextList = await result.text();
  validateTrackerResponse(trackerTextList);

  const trackerList = parseResponseText(trackerTextList);

  return trackerList;
}

export function getFlags(): { hash: string; name?: string } {
  const flags = parse(Deno.args, {
    alias: {
      h: "hash",
      n: "name",
    },
  });

  const hash = flags["hash"] ?? flags._[0];
  const name = flags["name"];

  validateBitTorrentHash(hash);

  return {
    hash,
    name,
  };
}
