# Publish latest, invite your developer, and set up a two-track workflow

## 1. Re-publish the site

The published URL (https://tractionxtemp.lovable.app) is two days behind your latest work: the Reconfigurable Booths page and the Booth Builder return 404 on the live site. Your latest saved version is from Sep 28 and builds cleanly.

- Re-publish the current project so https://tractionxtemp.lovable.app serves the newest build.
- Verify the Reconfigurable page loads 200 on the published URL afterward.
- The site stays noindexed (robots.txt Disallow + noindex), so publishing doesn't expose it to Google.

## 2. Inviting your developer

Lovable invitations are sent from the Lovable UI, not from chat:

- You (the owner) open the project → share/members settings → invite him by email to the workspace/project.
- Once he accepts, he can open this same project, see the code (GitHub export / Dev Mode), make edits, and publish.
- Share the noindexed live URL with him for review; no login needed for tractionxtemp.lovable.app.

## 3. Workflow: your tweaks vs. his work

Lovable edits apply to the project sequentially — two people typing in the same branch at the same time can step on each other. The clean setup:

- **Your minor tweaks**: keep doing them here on the main project as you do now.
- **His larger work**: do it in a **draft branch** (Lovable supports drafts with their own isolated backend). Drafts don't affect the main project or the published site until you merge.
- **Merge & publish**: when his work is ready, approve/merge the draft into main, re-publish, and your tweaks are all still there.
- Rule of thumb: don't both edit the same page on main at the same moment; anything bigger than a copy tweak goes to a draft.

## Out of scope

- No code changes in this step — publish, invitation guidance, and workflow only.
