# SRCF Lute Backups

This repo does not store the live database or backups. The database is SQLite on SRCF and the backup sync is driven by local macOS LaunchAgents and scripts under `~/scripts`.

## SRCF Paths

- Live DB: `shell_srcf:/home/jbr46/lute-v3/data/lute.db`
- App data dir: `shell_srcf:/home/jbr46/lute-v3/data/`
- Backup dir on SRCF: `shell_srcf:/home/jbr46/lute_backups/`
- Secondary account backups: `shell_srcf_julia:/home/jef66/lute_backups/`

## Local Sync (macOS)

- LaunchAgent: `~/Library/LaunchAgents/com.user.lute-backup.plist`
- Script: `~/scripts/fetch_lute_backups.sh`
- Schedule: daily at 01:00 local time (plus wake-triggered runs)
- Output: `~/lute_backups/`
- Logs: `~/lute_backups/backup_log.log`
- Last run marker: `~/lute_backups/.last_run`

The script rsyncs from SRCF into `~/lute_backups/<user>/<YYYYMMDD>/` and keeps only the last 5 days of dated directories.

## Wake-triggered Runs

- Sleepwatcher LaunchAgent: `~/Library/LaunchAgents/de.bernhard-baehr.sleepwatcher.plist`
- Wake hook: `~/.wakeup`
- Wake script: `~/scripts/check_missed_backup.sh`
- Wake log: `~/lute_backups/wake_log.log`

This runs the backup script on wake if the scheduled run was missed.

## Manual Run / Debugging

- Run now: `~/scripts/fetch_lute_backups.sh`
- Check agent loaded: `launchctl list | rg -n "lute-backup"`
- Check logs: `tail -n 50 ~/lute_backups/backup_log.log`
- Quick connectivity check: `ssh shell_srcf 'true'`

If the log shows SSH failures right after wake, it is likely the network wasn’t ready yet. The script now waits for SSH to become available before rsyncing.
