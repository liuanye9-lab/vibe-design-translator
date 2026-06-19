#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_FILE="$ROOT_DIR/VibeDesignTranslator.xcodeproj/project.pbxproj"
SCHEME_FILE="$ROOT_DIR/VibeDesignTranslator.xcodeproj/xcshareddata/xcschemes/VibeDesignTranslator.xcscheme"
ASSETS_DIR="$ROOT_DIR/VibeDesignTranslator/Resources/Assets.xcassets"
APPICON_DIR="$ASSETS_DIR/AppIcon.appiconset"
BUILD_SCRIPT="$ROOT_DIR/script/build_and_run.sh"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

pass() {
  echo "OK: $*"
}

check_file() {
  local file="$1"
  [[ -f "$file" ]] || fail "missing file: $file"
}

check_file "$PROJECT_FILE"
check_file "$SCHEME_FILE"
check_file "$BUILD_SCRIPT"
check_file "$ASSETS_DIR/Contents.json"
check_file "$APPICON_DIR/Contents.json"

plutil -lint "$PROJECT_FILE" >/dev/null
pass "project file parses"

xmllint --noout "$SCHEME_FILE"
pass "shared scheme XML parses"

bash -n "$BUILD_SCRIPT"
pass "build script syntax"

python3 -m json.tool "$ASSETS_DIR/Contents.json" >/dev/null
python3 -m json.tool "$APPICON_DIR/Contents.json" >/dev/null
pass "asset JSON parses"

python3 - "$APPICON_DIR/Contents.json" "$APPICON_DIR" <<'PY'
import json
import struct
import sys
from pathlib import Path

contents = Path(sys.argv[1])
root = Path(sys.argv[2])

expected = {
    ("16x16", "1x"): 16,
    ("16x16", "2x"): 32,
    ("32x32", "1x"): 32,
    ("32x32", "2x"): 64,
    ("128x128", "1x"): 128,
    ("128x128", "2x"): 256,
    ("256x256", "1x"): 256,
    ("256x256", "2x"): 512,
    ("512x512", "1x"): 512,
    ("512x512", "2x"): 1024,
}

payload = json.loads(contents.read_text())
seen = set()
for image in payload.get("images", []):
    key = (image.get("size"), image.get("scale"))
    if key not in expected:
        raise SystemExit(f"unexpected app icon slot: {key}")
    filename = image.get("filename")
    if not filename:
        raise SystemExit(f"missing filename for app icon slot: {key}")
    path = root / filename
    if not path.exists():
        raise SystemExit(f"missing app icon file: {filename}")
    with path.open("rb") as file:
        header = file.read(24)
    if not header.startswith(b"\x89PNG\r\n\x1a\n"):
        raise SystemExit(f"not a png file: {filename}")
    width, height = struct.unpack(">II", header[16:24])
    size = expected[key]
    if width != size or height != size:
        raise SystemExit(f"wrong size for {filename}: {width}x{height}, expected {size}x{size}")
    seen.add(key)

missing = set(expected) - seen
if missing:
    raise SystemExit(f"missing app icon slots: {sorted(missing)}")
PY
pass "app icon slots and PNG dimensions"

if grep -R \
  --exclude="verify_project.sh" \
  -E 'sk-[A-Za-z0-9]|GU0oMMFTEkG4|AGNES_API_KEY[[:space:]]*=[[:space:]]*["'\'']' \
  "$ROOT_DIR" >/dev/null; then
  fail "possible secret found under macOS project"
fi
pass "secret scan"

if command -v xcodebuild >/dev/null 2>&1 && xcodebuild -version >/dev/null 2>&1; then
  echo "INFO: xcodebuild is available; running scheme listing"
  xcodebuild -list -project "$ROOT_DIR/VibeDesignTranslator.xcodeproj" >/dev/null
  pass "xcodebuild can inspect project"
else
  echo "WARN: xcodebuild unavailable for active developer directory; install full Xcode to run build verification"
fi

pass "project verification complete"
