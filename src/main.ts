import { getFlags, getTrackers, buildMagnetLink, log } from "./functions.ts";

async function main() {
  const { hash, name } = getFlags();
  const trackers = await getTrackers();
  const magnetLink = buildMagnetLink(hash, trackers, name);
  log(magnetLink);
}

main().catch((err: Error) => {
  log("usage: magnet [options] <hash>");
  log(err.message);
  Deno.exit(1);
});
