#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-run}"
APP_NAME="VibeDesignTranslator"
BUNDLE_ID="com.lay.vibedesigntranslator"
CONFIGURATION="${CONFIGURATION:-Debug}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_FILE="$ROOT_DIR/VibeDesignTranslator.xcodeproj"
DERIVED_DATA="$ROOT_DIR/dist/DerivedData"
APP_BUNDLE="$DERIVED_DATA/Build/Products/$CONFIGURATION/$APP_NAME.app"
APP_BINARY="$APP_BUNDLE/Contents/MacOS/$APP_NAME"

usage() {
  echo "usage: $0 [run|--debug|--logs|--telemetry|--verify]" >&2
}

require_xcode() {
  if ! command -v xcodebuild >/dev/null 2>&1; then
    echo "xcodebuild was not found. Install full Xcode and select it with xcode-select." >&2
    exit 1
  fi

  if ! xcodebuild -version >/dev/null 2>&1; then
    echo "xcodebuild is unavailable for the active developer directory." >&2
    echo "Install full Xcode, then run: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer" >&2
    exit 1
  fi
}

build_app() {
  require_xcode
  pkill -x "$APP_NAME" >/dev/null 2>&1 || true
  xcodebuild \
    -project "$PROJECT_FILE" \
    -scheme "$APP_NAME" \
    -configuration "$CONFIGURATION" \
    -derivedDataPath "$DERIVED_DATA" \
    build
}

open_app() {
  /usr/bin/open -n "$APP_BUNDLE"
}

build_app

case "$MODE" in
  run)
    open_app
    ;;
  --debug|debug)
    lldb -- "$APP_BINARY"
    ;;
  --logs|logs)
    open_app
    /usr/bin/log stream --info --style compact --predicate "process == \"$APP_NAME\""
    ;;
  --telemetry|telemetry)
    open_app
    /usr/bin/log stream --info --style compact --predicate "subsystem == \"$BUNDLE_ID\""
    ;;
  --verify|verify)
    open_app
    sleep 2
    pgrep -x "$APP_NAME" >/dev/null
    ;;
  *)
    usage
    exit 2
    ;;
esac
