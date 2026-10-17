# Family Reading v14

Responsive, installable family reading tracker upgraded from the supplied v12 HTML.

## Files
`dist/index.html` contains the interface, catalog, and application code. It works as a local HTML file for device-only records. To enable installation and the offline shell, host the entire `dist` directory over HTTPS. Manifest, service worker and PNG icons must remain beside index.html.

## Existing records
The v8 browser storage keys and v12 backup/Firestore schema are retained. Browser storage is origin-specific: records from an old website do not automatically appear at a new address. Export each student from the old site and import it into the matching student, or use the existing Firebase account. Imports merge after confirmation and retain a local pre-import recovery snapshot. Cancel performs no mutation.

## Firebase
The original Firebase web-client configuration is retained. Add `family-reading-eden.exactquail16.chatgpt.site` to Firebase Authentication authorized domains before Google sign-in on this deployment. Enable the Google provider and configure Firestore rules for authenticated user-owned records at `users/{uid}/students/{studentId}`. The app shows the current hostname in Settings → Cloud → Connection details. No Firebase console settings were modified by this upgrade. Google sign-in and real Firestore writes require validation with your account.

Local and cloud records are never silently replaced when both contain data. Use Load Cloud to confirm merging. Writes use a Firestore transaction and stop if another device has changed the cloud revision. Student selection is a family convenience, not an authentication boundary. On sign-in, the app discovers student profiles already present in the same Google account’s Firestore student collection. A new custom student appears on other devices only after its first cloud save. Family summary values reflect records loaded into this device.

## PWA
On supported browsers, use the Install button or browser menu. iOS: Safari → Share → Add to Home Screen. The service worker caches the app shell and local icons only. Firebase login and library search require internet access. Installation/offline behavior has not been verified on a physical device.

## Verification
JavaScript syntax, HTML structure, 224 catalog entries, grade filters, reading/complete/undo, review draft persistence, reward validation, separate students, one bonus per course week, non-destructive import cancellation, print markup and stale cloud response protection were checked with a Node VM harness. No browser rendering or real Firebase account integration was tested in this environment.

## v14 improvements
- Continue reading card and reading-only catalog filter.
- Dated reading sessions with minutes, current page, total pages, and a short note.
- Per-student weekly-minute and monthly-completion goals; Monday-based local-calendar weekly chart.
- Family overview using device-resident data.
- Full-family backup and confirmed merge import, retaining a recovery snapshot.
- Session IDs prevent duplicate time when importing repeatedly. Deleted sessions retain tombstones and are excluded from totals. Removing a session leaves the current book page unchanged, as stated in the confirmation.
- Cloud student discovery after authentication.
- Print prompts to save an edited reflection draft first.

The Node VM regression suite additionally checks reading-time/page validation, session isolation, goals, full-family import cancellation, log deduplication, and deletion. Cloud discovery and physical-device PWA behavior still require account/device validation.
