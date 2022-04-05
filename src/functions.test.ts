import {
  assertThrows,
  assertStrictEquals,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import { validateBitTorrentHash } from "./functions.ts";

Deno.test("Hash validation", () => {
  // @ts-expect-error: Testing invalid input
  assertThrows(() => validateBitTorrentHash(), Error);
  // @ts-expect-error: Testing invalid input
  assertThrows(() => validateBitTorrentHash(2), Error);
  assertThrows(() => validateBitTorrentHash(""), Error);
  assertThrows(() => validateBitTorrentHash("^&&*"), Error);

  const INVALID_HASH = "!234567890123456789012345678901234567890";
  assertThrows(() => validateBitTorrentHash(INVALID_HASH), Error);

  const VALID_HASH = "1234567890123456789012345678901234567890";
  assertStrictEquals(validateBitTorrentHash(VALID_HASH), undefined);
});
