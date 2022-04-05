import {
  assertThrows,
  assertStrictEquals,
} from "https://deno.land/std@0.133.0/testing/asserts.ts";
import {
  validateBitTorrentHash,
  validateTrackerResponse,
} from "./functions.ts";

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

Deno.test("tracker API response", () => {
  // @ts-expect-error: Testing invalid input
  assertThrows(() => validateTrackerResponse(), Error);
  // @ts-expect-error: Testing invalid input
  assertThrows(() => validateTrackerResponse(2), Error);
  assertThrows(() => validateTrackerResponse(""), Error);

  const INVALID_RESPONSE = "ftp://wrong.com";
  assertThrows(() => validateTrackerResponse(INVALID_RESPONSE), Error);

  const VALID_RESPONSE = "https://valid.com";
  assertStrictEquals(validateTrackerResponse(VALID_RESPONSE), undefined);
});
