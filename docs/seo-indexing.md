# SEO & Indexing Automation

Plain-English reference for the indexing pipeline — how new pages on naultlaw.com get into search engines' indexes without manual clicks.

---

## TL;DR

A scheduled task on Steve's Windows machine runs every Monday at 9 AM. It pulls the live sitemap from `https://naultlaw.com/sitemap.xml`, then submits every URL in it to **two** indexing channels:

1. **Google Indexing API** — official, but only fully effective for `JobPosting` and `BroadcastEvent` schemas. The script submits anyway because it's a no-op rather than an error for other pages.
2. **Bing IndexNow** — works for general pages. Also honored by Yandex, Seznam.cz, Naver, and several AI-search products built on Bing's index.

Pages added since the last run get pushed automatically through both channels. Stuck pages get re-pinged.

No action required from Steve. The system maintains itself.

---

## Why this exists

Search engines' natural crawl queues can sit on new URLs for weeks before getting around to them — especially for newer sites. Indexing APIs let us bypass those queues and tell the search engine "please look at this URL now," which typically results in crawl within hours-to-days instead of weeks.

After the V2 launch + the bulk `/services/*` SEO pages, we had ~95 pages stuck in "Discovered – currently not indexed" because Google was working through them slowly. The automation pushes Google (and now Bing + IndexNow-honoring engines) to actually look at them.

**Why two channels.** Google's Indexing API is officially restricted to `JobPosting` and `BroadcastEvent` schemas. Submitting other URL types is technically permitted (the call is a no-op rather than an error), but the real-world indexing lift is small for service pages and articles. Bing's IndexNow protocol does work for general pages and is also honored by Yandex, Seznam.cz, Naver, and several AI-search products that index Bing's surface. Running both gives us Google coverage if the schemas ever apply, plus actual Bing-side visibility today.

---

## What's running

| Piece | Where | What it does |
|---|---|---|
| **Google Cloud project** `naultlaw-website` | Steve's Google account, project ID `naultlaw-website` | Hosts the service account and enables 3 APIs (Indexing, Search Console, Site Verification). |
| **Service account** `naultlaw-indexing-bot@naultlaw-website.iam.gserviceaccount.com` | Same Cloud project | Authenticates the script. Verified `siteOwner` of `sc-domain:naultlaw.com` in Search Console. |
| **DNS TXT record at GoDaddy** | `naultlaw.com` zone | Grants the service account ownership of the domain in Search Console. Value: `google-site-verification=MOhgZkh6tC6to36IoOGGl7zsvOIgOUe4L63kpAHhKSI`. Don't delete this. |
| **Service account JSON key** (Google) | `C:\Users\admin\.naultlaw-keys\indexing-sa.json` | The credential the script uses for Google. Never goes into git. Treated like a password. |
| **IndexNow API key** (Bing + friends) | `C:\Users\admin\.naultlaw-keys\indexnow-key.txt` | 32-char hex string. Never goes into git. Paired with the public verification file below. |
| **IndexNow verification file** (in repo) | `public/<key>.txt` | Public asset served at `https://naultlaw.com/<key>.txt`. Bing crawls this URL to verify that whoever is submitting URLs controls the domain. The file contains the same 32-char key as the local file above. |
| **Submission script** | `C:\Users\admin\.naultlaw-keys\submit-from-sitemap.mjs` | Fetches sitemap, submits every URL to Google's Indexing API, then submits the same URL list to Bing's IndexNow endpoint. Writes one log per channel per run. |
| **Windows scheduled task** "Naultlaw - Indexing Submission" | Steve's machine, Task Scheduler | Runs the script every Monday at 9 AM. |
| **Log files** | `C:\Users\admin\.naultlaw-keys\logs\google-*.log` and `indexnow-*.log` | One log per channel per run. Most recent 20 of each kind are kept; older ones auto-delete. The pre-2026-05-14 `submit-*.log` filename pattern is also pruned by the same rule. |

**The script and its credentials never live in this git repo.** Only the public IndexNow verification file (`public/<key>.txt`) is committed — that file is meant to be publicly served. The Google credential JSON, the IndexNow key file, and the script itself all live on Steve's local machine.

---

## How a typical week works

1. **Monday 9 AM** — Task Scheduler wakes up and runs the script.
2. The script fetches `https://naultlaw.com/sitemap.xml` and parses out every `<loc>` URL.
3. **Google channel:** reads `indexing-sa.json`, exchanges it for a one-hour OAuth access token, then POSTs each URL to `https://indexing.googleapis.com/v3/urlNotifications:publish` with `type: "URL_UPDATED"`. ~150ms pause between requests.
4. Successes and failures are logged to `C:\Users\admin\.naultlaw-keys\logs\google-<timestamp>.log`.
5. **IndexNow channel:** reads `indexnow-key.txt`, then POSTs the URL list in batches of 500 to `https://api.indexnow.org/indexnow` with the key and `keyLocation` (the public verification URL). One JSON body per batch; 200 OK or 202 Accepted both mean success.
6. Successes and failures are logged to `C:\Users\admin\.naultlaw-keys\logs\indexnow-<timestamp>.log`.
7. The script exits. Task Scheduler records the result. Non-zero exit if **either** channel had failures.

Total runtime: roughly 30–45 seconds for ~70 URLs (~150ms pause per Google request + one IndexNow POST per 500 URLs).

---

## What happens when you publish a new article or page

You don't have to do anything. The next Monday's run picks it up automatically because:

1. New articles/pages in the V2 codebase appear in `src/lib/content/resources.ts` (or wherever).
2. After deploy, `https://naultlaw.com/sitemap.xml` regenerates and includes the new URL.
3. Monday morning, the script pulls the updated sitemap and submits the new URL.
4. Google typically crawls it within 24-48 hours.

If you want a brand-new page indexed immediately (e.g., you just published a hot article and don't want to wait until Monday), you can manually trigger the task:

- Open Task Scheduler → find "Naultlaw - Indexing Submission" → right-click → **Run**.

It'll run within seconds, do its thing, and update the log.

---

## How to interact with the automation

| Action | How |
|---|---|
| **See when it next runs** | Task Scheduler → "Task Scheduler Library" → click "Naultlaw - Indexing Submission" → bottom pane → Triggers tab. |
| **See when it last ran and the result** | Same task → History tab. Or read the most recent log file. |
| **Run it manually right now** | Right-click the task → **Run**. |
| **Read the latest log** | Open `C:\Users\admin\.naultlaw-keys\logs\` and open the file with the most recent timestamp. Successes/failures are listed in plain English. |
| **Change the schedule** (e.g., daily) | Right-click the task → Properties → Triggers tab → Edit. |
| **Pause the automation** | Right-click → **Disable**. The task stays defined but stops firing. |
| **Re-enable** | Right-click → **Enable**. |
| **Delete the automation entirely** | Right-click → **Delete**. |

---

## Troubleshooting

### "I think a page should be indexed but Search Console says it isn't"

Reality check first:
- Open the most recent log in `C:\Users\admin\.naultlaw-keys\logs\` and search for the URL. If it was submitted successfully on the last run, the submission side is doing its job.
- Submission ≠ indexing. Google can still decline to index a page (typically because of thin content, duplicates, or low authority signals). Submission just guarantees Google has *seen* the URL.

If the URL isn't in the most recent log:
- Confirm it's in the sitemap: open `https://naultlaw.com/sitemap.xml` in a browser, search for the URL. If it's not there, the issue is upstream (sitemap generation, not indexing).
- If it IS in the sitemap but not in the log, the script may have skipped or failed on that URL. Open the log and look for `✗` next to the URL.

### "The scheduled task ran but the log says X failed"

Open the log. The failure reasons are listed at the bottom. Common ones:

- **403 Permission denied** — service account lost its property ownership. Usually means the DNS TXT record at GoDaddy got removed or modified. Verify the record is still present (see "DNS TXT record" in the table above).
- **Network error** — temporary; the next run will retry.
- **429 Quota exceeded** — Google's Indexing API has a default quota of 200 requests/day. We're submitting ~100, so this shouldn't happen. If it does, file a quota increase via Cloud Console.

### "The task didn't run on Monday"

Most common cause: the machine was powered off or asleep at 9 AM. The task is configured with `StartWhenAvailable`, so it will fire as soon as the machine wakes up — but if the machine stayed off all day, it won't run until the next time it boots.

Verify:
- Task Scheduler → History tab on the task shows attempted runs and their outcomes.
- Or check `Get-ScheduledTaskInfo -TaskName "Naultlaw - Indexing Submission"` in PowerShell.

### "Google Cloud is showing a charge"

The Indexing API and Search Console API are both free at our usage levels. If you see a Cloud Console charge, something else got added to the project. Check Billing → Reports to see what's costing money. The only thing this automation should be using is API quota, which is free.

### "IndexNow log says HTTP 422"

422 from the IndexNow endpoint means **key verification failed**. The most common cause is that `https://naultlaw.com/<key>.txt` is not reachable, returns the wrong content, or returns the right content but with extra whitespace / a different encoding than what's in `indexnow-key.txt`.

Verify:
1. Open `https://naultlaw.com/<key>.txt` in a browser. Should return 200 with **exactly** the 32-char hex key — no HTML, no newline at the end, no BOM.
2. The key in the browser response must match `C:\Users\admin\.naultlaw-keys\indexnow-key.txt` character-for-character.
3. If the verification URL is 404, the public asset hasn't deployed yet (or Vercel cached the deploy at a previous commit). Wait for the next deploy to land or trigger a redeploy.

### "IndexNow log says HTTP 403"

Bing has temporarily flagged the host. Wait 24 hours and try again. If it persists, check Bing Webmaster Tools for any manual-actions / spam flags on the domain.

### "IndexNow log says network errors only"

The IndexNow endpoint occasionally returns connection resets under load. The script logs each batch failure separately so transient errors are visible. If every batch fails on a single run, retry by manually triggering the scheduled task — the IndexNow side is idempotent and re-submitting the same URLs is safe.

---

## Bing IndexNow

The second channel the script runs. Added 2026-05-14 because Google's Indexing API officially restricts to `JobPosting` / `BroadcastEvent` schemas — for the bulk of naultlaw.com's URLs (service pages, articles), Google's API is largely a no-op. IndexNow does work for general pages.

### What IndexNow is

A protocol introduced by Microsoft and adopted by Bing, Yandex, Seznam.cz, Naver, and several AI-search products. A single POST to `https://api.indexnow.org/indexnow` propagates to every IndexNow-honoring engine — you don't need separate per-engine integrations.

The API works like this:

```
POST https://api.indexnow.org/indexnow
Content-Type: application/json; charset=utf-8

{
  "host": "naultlaw.com",
  "key": "<32-char hex key>",
  "keyLocation": "https://naultlaw.com/<32-char hex key>.txt",
  "urlList": ["https://naultlaw.com/...", "..."]
}
```

- The `key` is a secret-ish string you generate. It's "secret-ish" because anyone who can read the public verification file could in theory submit URLs for the domain — but the public file IS the verification, so the key is not actually a secret, just a paired identifier.
- `keyLocation` is the URL of a public file on the domain that contains the same key. Bing fetches this URL to confirm domain ownership before processing submissions.
- 200 OK and 202 Accepted both mean success. 422 means key verification failed (almost always: the verification URL isn't reachable yet).
- The protocol allows up to 10,000 URLs per batch. The script uses 500-URL batches to avoid edge-network issues.

### Where the key lives

| File | Location | What it is |
|---|---|---|
| Local key file | `C:\Users\admin\.naultlaw-keys\indexnow-key.txt` | 32-char hex string. The script reads this and includes it in the POST body. Not in git. |
| Public verification file | `public/<key>.txt` in this repo, served at `https://naultlaw.com/<key>.txt` | Same 32-char hex string. Committed to git because it's intentionally public. |

Both files must contain **exactly the same 32-char hex string**, no newline at the end, no whitespace, no BOM. The script's regex check rejects anything else.

### How to rotate the IndexNow key

If the key ever needs to be rotated (security hygiene, or a leak):

1. Generate a new 32-char hex string:
   ```powershell
   node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
   ```
2. Save the new key to `C:\Users\admin\.naultlaw-keys\indexnow-key.txt` (replace existing contents, no trailing newline).
3. Add the new verification file at `public/<newkey>.txt` (same content), open a small PR, merge, deploy.
4. Once the new verification URL is reachable, the next scheduled run uses the new key automatically.
5. Old verification file: leave the old `public/<oldkey>.txt` in the repo for a week, then delete in a follow-up PR. (IndexNow doesn't have an "expire this key" call — it stops accepting the old key as soon as the verification URL stops returning it.)

### Recreate-from-scratch playbook (IndexNow side)

If the IndexNow side ever needs to be set up from zero (new machine, lost key, fresh domain):

1. Generate a new key: `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`
2. Save the key to `C:\Users\admin\.naultlaw-keys\indexnow-key.txt` (no trailing newline).
3. Create `public/<key>.txt` in the repo with the same content. Commit, push, merge, deploy.
4. Confirm `https://naultlaw.com/<key>.txt` returns 200 with exactly the key.
5. The submission script automatically picks up the new key on its next run. No script edit needed.

---

## If you ever need to recreate this from scratch (Google side)

For example, on a new machine, or if the Google credentials are compromised and need to be rotated. The full Google-side setup playbook (the IndexNow recreate playbook is in the "Bing IndexNow" section above):

1. **In Google Cloud Console**, create a new project (or use the existing `naultlaw-website` one). Enable these 3 APIs:
   - Web Search Indexing API (`indexing.googleapis.com`)
   - Google Search Console API (`searchconsole.googleapis.com`)
   - Site Verification API (`siteverification.googleapis.com`)

2. **Create a service account** in IAM & Admin → Service Accounts. No special roles needed.

3. **Generate a JSON key** for the service account. Download it.
   - If your Cloud organization has the "Disable Service Account Key Creation" policy enforced, you'll need to override it at the project level: IAM & Admin → Organization Policies → find `iam.disableServiceAccountKeyCreation` → MANAGE POLICY → Override parent's policy → Enforcement: Off. (You may need to grant yourself "Organization Policy Administrator" at the org level first.)
   - Save the JSON key file to `C:\Users\admin\.naultlaw-keys\indexing-sa.json` (or wherever — just don't put it in this repo or in OneDrive/Drive sync).

4. **Verify domain ownership for the service account.** Run `node verify-and-add.mjs token` (still in `C:\Users\admin\.naultlaw-keys\`) to get a DNS TXT record value. Add that value as a new TXT record at the root (`@`) of `naultlaw.com` at GoDaddy. Wait ~30 seconds for DNS propagation. Run `node verify-and-add.mjs verify` to confirm and register the property in Search Console.

5. **Copy `submit-from-sitemap.mjs`** into the same folder.

6. **Register the Windows scheduled task** via PowerShell:
   ```powershell
   $action = New-ScheduledTaskAction -Execute "C:\Program Files\nodejs\node.exe" -Argument "C:\Users\admin\.naultlaw-keys\submit-from-sitemap.mjs"
   $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 9am
   $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 5) -ExecutionTimeLimit (New-TimeSpan -Minutes 30)
   Register-ScheduledTask -TaskName "Naultlaw - Indexing Submission" -Action $action -Trigger $trigger -Settings $settings -Force
   ```

7. **Trigger it manually once** to verify it works:
   ```powershell
   Start-ScheduledTask -TaskName "Naultlaw - Indexing Submission"
   ```
   Then check `C:\Users\admin\.naultlaw-keys\logs\` for a fresh log file with "97 succeeded, 0 failed" or similar.

---

## Rotating the service account key

Service account keys don't auto-expire, but if you ever want to rotate (good security hygiene to do once a year):

1. In Cloud Console → IAM & Admin → Service Accounts → click `naultlaw-indexing-bot` → Keys tab.
2. Add a new key (JSON). Download it.
3. Replace the contents of `C:\Users\admin\.naultlaw-keys\indexing-sa.json` with the new key.
4. Manually trigger the scheduled task to confirm the new key works.
5. Back in Cloud Console → Keys tab, delete the OLD key.

Don't delete the old key before verifying the new one — leave both active for the test run.

---

## Related docs

- [`docs/intake-pipeline.md`](./intake-pipeline.md) — what happens when a visitor submits the contact form
- [`docs/crm-contract.md`](./crm-contract.md) — the webhook contract between the website and the CRM
- [`docs/admin-guide.md`](./admin-guide.md) — overall plain-English admin reference

For the actual SEO content strategy (what `/services/*` pages exist, which keywords they target, internal linking), see whatever notes or briefs the SEO/audit work produced — that's separate from this automation, which just handles the mechanical "tell Google these URLs exist" step.
