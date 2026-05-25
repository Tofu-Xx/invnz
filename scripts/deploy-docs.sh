#!/usr/bin/env bash
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Building tutorial site..."
pnpm docs:build

TMP_DIR=$(mktemp -d)
cp -r tutorial/.vitepress/dist/* "$TMP_DIR"

echo "Creating deployment branch..."
git checkout --orphan _gitee_pages_tmp
rm -rf *
cp -r "$TMP_DIR"/* .

git add -A
git commit -m "deploy docs $(date +%Y-%m-%d-%H-%M-%S)"
git push origin _gitee_pages_tmp:gitee-pages --force

git checkout main
git branch -D _gitee_pages_tmp

rm -rf "$TMP_DIR"

echo "Done! gitee-pages branch updated."
echo "Visit https://gitee.com/Tofu_Xx/invnz/settings/pages to deploy/update."
