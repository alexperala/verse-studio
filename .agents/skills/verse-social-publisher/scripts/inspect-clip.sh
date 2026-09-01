#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <video-file>" >&2
  exit 2
fi

input=$1

if [[ ! -f "$input" ]]; then
  echo "Clip not found: $input" >&2
  exit 1
fi

command -v ffprobe >/dev/null 2>&1 || {
  echo "ffprobe is required" >&2
  exit 1
}

ffprobe \
  -v error \
  -show_entries format=filename,duration,size,format_name:stream=index,codec_name,codec_type,width,height \
  -of json \
  "$input"
