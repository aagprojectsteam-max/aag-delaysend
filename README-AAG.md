# AAG DelaySend

Thunderbird add-on for scheduled sending: a fork of
[Send Later](https://github.com/Extended-Thunder/send-later) 10.7.8
(Extended-Thunder, MPL-2.0) with the scheduling window rebuilt in Hebrew/RTL.
The engine (background.js, experiments/, utils/) is upstream's; only the popup
and the add-on identity changed.

## What changed against upstream (branch `aag`, remote `upstream` = tag v10.7.8)

- `manifest.json`: name **AAG DelaySend**, id `delaysend@aag.local`,
  `strict_max_version "*"`, compose/browser action titles. Locale
  `extensionName` stays "Send Later" so column headers and menus keep the
  translated strings.
- `utils/tools.js`: the add-on id used for `getExtension()`.
- `utils/defaultPrefs.json`: telemetry asked = true, enabled = false — no
  telemetry prompt, nothing sent to upstream's server.
- `ui/popup.html`: rewritten. Date + time pickers, quick chips (15/30 min,
  1 h, 2 h, tomorrow 09:00, Sunday 09:00), one primary "schedule" button,
  secondary "send now" / "outbox", and a collapsed advanced section holding
  recurrence (default **once**), "only between", "only on days", "until" and
  the save/clear defaults links. Free-text time entry lives under a small
  `<details>`. Every element id popup.js relies on is unchanged.
- `ui/popup.js`: small additions only — chips fill the pickers and fire the
  regular `change` path; the schedule button's "(in N minutes)" is replaced
  by a Hebrew relative time; the advanced section opens by itself when saved
  defaults or the window's cached schedule use more than a one-time send;
  the quick-option loop skips the (removed) quick buttons; `stateSetter`
  no longer forces black text (dark theme); focus lands on the schedule
  button instead of the text field.

## Build

```bash
cd /mnt/data/MyProjects/AAG-DelaySend && mkdir -p dist && zip -qr dist/aag-delaysend-10.7.8.xpi _locales experiments ui utils background.js manifest.json -x '*.tmp'
```

Checks before building: `node --check ui/popup.js`, and every
`getElementById("…")` / `dom["…"]` id in popup.js must exist in popup.html.

## Install

Send Later and AAG DelaySend read and write the same `X-Send-Later-*`
headers in Drafts, so they must never run together: uninstall Send Later
first, then Add-ons → gear → *Install Add-on From File…* →
`dist/aag-delaysend-10.7.8.xpi`. Already-scheduled drafts carry over.
Saved defaults and options do **not** carry over (new add-on id → fresh
storage), which is what gives the "once" default.

## Known limits

- Icon is still upstream's.
- `commands` descriptions in the manifest still say "Send Later's shortcut N".
- The free-text date field understands English only (Sugar.js, as upstream).
