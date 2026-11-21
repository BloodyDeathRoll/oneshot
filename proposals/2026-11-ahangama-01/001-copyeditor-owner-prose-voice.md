# 001: copyeditor and humanizer — the voice audit and the owner's own sentences

**Prompt change proposal** to `agents/copyeditor/base.md` and `agents/humanizer/base.md`, run 2026-11-ahangama-01, business the-sandhya. No `custom.md` is touched. Nothing is applied until this proposal is merged (gate d). Until then, The Sandhya alone runs on the operator's ruling below.

## Why

The copy review on The Sandhya, round 1 (`sites/the-sandhya/copy/review.md`), found two rules it cannot satisfy together. The voice audit requires "no triads" and "no padding vocabulary", and a pass needs it clean. The same audit requires "register matches the owner's", and `agents/copywriter/base.md` says of owner prose: "Use it. It is their voice and it beats anything you would write."

Most of this page is the hotel's own writing, and that writing uses triads and some tell-list words. The humanizer kept them and said so; the copyeditor could not exempt them. Without a rule, every round on an owner-prose page repeats that result.

## Operator's ruling for this business

Alon, 2026-11-06, left the call to the session ("you decide"), which took the recommendation it had set out: on The Sandhya, the hotel's own sentences are exempt from "no triads" and "no padding vocabulary". This is the only exemption. Their facts, including superlatives and rankings, are audited as usual, and sentences the agents wrote get the full voice audit.

After review round 2, Alon widened it (2026-11-06): an owner sentence stays exempt when its clauses are moved or a word or two is changed for grammar or to drop a claim, such as "has" to "have" or "the perfect" to "a", as long as no other words are added. Round 2 had scored those as not exempt under the first wording. A sentence that is an agent's recast, or that adds words of its own, gets no exemption. If the third pass fails on voice alone, the business stops for Alon rather than going back to the harvester or out of the run.

## Change

In `agents/copyeditor/base.md`, under "The voice audit", after the list of checks:

> **Owner prose.** A sentence that `copy/sources.md` traces to the owner's own text is not scored on "no triads" or "no padding vocabulary": it is the register the page is matched to. That holds when the sentence is verbatim, trimmed, or has its clauses moved, and when a word or two is changed for grammar or to drop a claim, as long as no other words are added. List such sentences in `review.md` so a person can see what was exempted. Every other voice check applies, and so does the whole fact audit. A sentence an agent recast or added words to gets no exemption.

In `agents/humanizer/base.md`, after the rule on matching the owner's register:

> Leave the owner's own sentences as they are, including their triads and tell-list words, unless one does not parse or the copy review has flagged its facts. Name what you left in `humanizer-notes.md`.

Bump both versions and add a CHANGELOG line.

## What this costs

Some owner marketing language stays on owner-prose pages, as long as it survives the fact audit. A generated-sounding owner sentence would no longer be flagged on these two checks; "reads aloud without wincing" still applies.

## Not in this proposal

Excerpting a long testimonial with a visible ellipsis. `schemas/site-content.md` says "a quote is never trimmed to fit" and `agents/copywriter/base.md` says quotes are "never edited", so The Sandhya keeps its 2 testimonials.
