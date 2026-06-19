# Vibe Design Translator for macOS

Native SwiftUI app for turning a product idea into precise front-end design direction recommendations, execution blueprints, and a reusable motion material library.

## What is included

- Native SwiftUI sidebar app, no WebView shell.
- Native macOS app icon asset set.
- Direction Agent that calls `https://apihub.agnes-ai.com/v1/chat/completions`.
- Default text model: `Agnes-2.0-Flash`.
- Default image model setting: `Agnes-Image-2.0-Flash`.
- Default video model setting: `Agnes-Video-V2.0`.
- Structured Agent output with direction score, judgment signals, material pattern IDs, page structure, visual system, motion system, component system, color tokens, typography rules, and an implementation prompt.
- Native clipboard export for the selected execution blueprint and implementation prompt.
- Native `.md` file export for the selected execution blueprint.
- Native macOS Design menu for generating, copying, exporting, and clearing sessions with keyboard shortcuts.
- Native macOS Settings scene for Agnes model and Keychain configuration.
- Animated SwiftUI material library for layout, color, typography, and interaction patterns.
- Material category filter and Agent-linked pattern highlighting.
- Persistent local settings: model configuration is stored in `UserDefaults`, and `AGNES_API_KEY` is stored in macOS Keychain.
- Session restore: the last brief, recommendations, selected direction, and highlighted material patterns are stored locally.
- Local fallback blueprints when the API key is missing or the provider returns an invalid response.

## Agent response contract

The Agnes response is parsed as strict JSON. Each recommendation can include:

- `directionId`: one of `calm-professional`, `soft-intelligent`, `experimental-premium`.
- `materialPatternIds`: references into the native material library.
- `blueprint`: a front-end execution plan with page sections, visual strategy, motion strategy, components, tokens, and a Chinese implementation prompt.

## Run

Open `VibeDesignTranslator.xcodeproj` in Xcode and run the `VibeDesignTranslator` scheme.

You can also run from this directory:

```bash
./script/build_and_run.sh
```

Useful flags:

```bash
./script/build_and_run.sh --verify
./script/build_and_run.sh --logs
./script/build_and_run.sh --debug
```

## Agnes API Key

The repository does not store API keys.

Provide the key in either place:

- App Settings screen: paste `AGNES_API_KEY` and click Save Settings. The key is stored in macOS Keychain.
- Xcode Scheme environment variable: `AGNES_API_KEY`. This takes precedence over the Keychain value.

## Local verification note

This project requires full Xcode for `xcodebuild`. If `xcode-select -p` points to `/Library/Developer/CommandLineTools`, switch to Xcode:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```
