# SEO & Google Indexing Automation

Plain-English reference for the indexing pipeline — how new pages on naultlaw.com get into Google's search index without manual clicks.

---

## TL;DR

A scheduled task on Steve's Windows machine runs every Monday at 9 AM. It pulls the live sitemap from `https://naultlaw.com/sitemap.xml`, then submits every URL in it to Google's Indexing API. Pages added since the last run get pushed automatically. Stuck pages get re-pinged.

No action required from Steve. The system maintains itself.

---

## Why this exists

Google's natural crawl queue can sit on new URLs for weeks before getting around to them — especially for newer sites. The Indexing API lets us bypass that queue and tell Google "please look at this URL now," which typically results in crawl within hours-to-days instead of weeks.

After the V2 launch + the bulk `/services/*` SEO pages, we had ~95 pages stuck in "Discovered – currently not indexed" because Google was working through them slowly. The automation pushes Google to actually look at them.

---

## What's running

| Piece | Where | What it does |
|---|---|---|
| **Google Cloud project** `naultlaw-website` | Steve's Google account, project ID `naultlaw-website` | Hosts the service account and enables 3 APIs (Indexing, Search Console, Site Verification). |
| **Service account** `naultlaw-indexing-bot@naultlaw-website.iam.gserviceaccount.com` | Same Cloud project | Authenticates the script. Verified `siteOwner` of `sc-domain:naultlaw.com` in Search Console. |
| **DNS TXT record at GoDaddy** | `naultlaw.com` zone | Grants the service account ownership of the domain in Search Console. Value: `google-site-verification=MOhgZkh6tC6to36IoOGGl7zsvOIgOUe4L63kpAHhKSI`. Don't delete this. |
| **Service account JSON key** | `C:\Users\admin\.naultlaw-keys\indexing-sa.json` | The credential the script uses. Never goes into git. Treated like a password. |
| **Submission script** | `C:\Users\admin\.naultlaw-keys\submit-from-sitemap.mjs` | Fetches sitemap, submits every URL to Indexing API, writes a log. |
| **Windows scheduled task** "Naultlaw - Indexing Submission" | Steve's machine, Task Scheduler | Runs the script every Monday at 9 AM. |
| **Log files** | `C:\Users\admin\.naultlaw-keys\logs\submit-*.log` | One log per run. Most recent 20 are kept; older ones auto-delete. |

**Nothing about this automation lives in this git repo.** It's all on Steve's local machine plus three Google Cloud configurations. That's intentional — the credential file (`indexing-sa.json`) is a secret and we never want it accidentally committed.

---

## How a typical week works

1. **Monday 9 AM** — Task Scheduler wakes up and runs the script.
2. The script reads `indexing-sa.json` to get credentials.
3. It exchanges those credentials for a one-hour Google OAuth access token.
4. It fetches `https://naultlaw.com/sitemap.xml` and parses out every `<loc>` URL.
5. For each URL, it POSTs to `https://indexing.googleapis.com/v3/urlNotifications:publish` with `type: "URL_UPDATED"`.
6. Successes and failures are logged to `C:\Users\admin\.naultlaw-keys\logs\submit-<timestamp>.log`.
7. The script exits. Task Scheduler records the result.

Total runtime: roughly 30 seconds for ~100 URLs (~150ms pause between each to avoid rate-limiting).

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

---

## If you ever need to recreate this from scratch

For example, on a new machine, or if the credentials are compromised and need to be rotated. The full setup playbook:

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
