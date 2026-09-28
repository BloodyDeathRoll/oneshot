# harvester / tools.md — what the agent may call, and how.

## `tools/fetch-video.mjs` — business-owned video (0.4.0)

`node tools/fetch-video.mjs --help` for every option. Needs `yt-dlp` (`~/.local/bin/yt-dlp`) and `ffmpeg`/`ffprobe`. Writes only under `dossier/<slug>/assets/` (git-ignored).

1. **List a channel first.** `node tools/fetch-video.mjs <slug> https://www.youtube.com/channel/<id>` (or a Vimeo user, a playlist, a tab) prints every video with its duration and saves the list to `assets/video/listings/<id>.json`. Nothing is downloaded. Put the listing in `sources.md`.
2. **Fetch a candidate.** `node tools/fetch-video.mjs <slug> <video-url> --license business-owned --license-note "<why>" --channel <UC… id | @handle> --no-renditions` downloads the best source (≤ 2160p; a direct `.mp4/.webm/.mov` file is fetched as is) and writes `assets/video/<id>-sheet.jpg`, a 6×4 contact sheet across the whole video. Leave `--license` at its default `unknown` unless the site/channel/account is the business's own; with `--channel`, an upload by anyone else is recorded as `unknown` regardless.
3. **Look at the sheet**, then cut: re-run the same command without `--no-renditions`, with `--start <s> --length <8–20> --poster-at <s> --describe "<what the frames show>"`. The source is reused, not downloaded again. Output: `<id>-d1920.mp4` (≤ 4 MB), `<id>-m1280.mp4` and `<id>-m720.mp4` (≤ 2 MB each), AV1 `<id>-d1920.webm` + `<id>-m1280.webm`, `<id>-poster.jpg` + `.avif`. All H.264 high/yuv420p, faststart, no audio track, never upscaled. A rendition over its cap after four tries is printed as a warning — pick a calmer cut or a shorter length.
4. Every file is an entry in `assets/index.json` (`kind: "video"` or `"image"` for posters; `video_id` groups them; `usable` is true only for `business-owned`). Copy the chosen ones into `dossier.json` `videos[]` in the shape of `schemas/dossier.md`.

Instagram/Facebook reels: pass the reel URL; if yt-dlp needs a login it fails, and that is the answer — record the reel URL in `sources.md` as "behind login", never pass cookies. Timing on a 50 s 1080p YouTube source: ~5 s download, ~12 s for sheet + poster + all five renditions (measured 2026-09-28, 32 cores).
