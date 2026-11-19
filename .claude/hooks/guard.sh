#!/usr/bin/env bash
# PreToolUse(Edit|Write|MultiEdit): block secrets and invented facts in migrated content. Exit 2 = block, stderr goes to Claude.
f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0
case "$(basename "$f")" in
  .env.example) ;;
  .env|.env.*) echo "Blocked: $f holds secrets. Edit .env.example and ask the user to update .env." >&2; exit 2 ;;
  *service-account*.json|*indexing-sa*.json) echo "Blocked: $f holds Google service-account credentials." >&2; exit 2 ;;
esac
# The Framer backup is the source of truth for migrated content: read-only.
if [[ "$(basename "$f")" == ampera-content-backup.md || "$(basename "$f")" == 06-open-roles.md ]]; then
  echo "Blocked: $f is a read-only reference document." >&2; exit 2
fi
exit 0
