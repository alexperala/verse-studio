#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input-video> <output-video>" >&2
  exit 2
fi

input=$1
output=$2

if [[ ! -f "$input" ]]; then
  echo "Clip not found: $input" >&2
  exit 1
fi

if [[ "$input" == "$output" ]]; then
  echo "Input and output paths must differ" >&2
  exit 1
fi

command -v ffmpeg >/dev/null 2>&1 || {
  echo "ffmpeg is required" >&2
  exit 1
}

ffmpeg -y -i "$input" \
  -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=luma_radius=32:luma_power=2:chroma_radius=16:chroma_power=1[bg];[0:v]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v]" \
  -map "[v]" \
  -map "0:a?" \
  -map_metadata 0 \
  -c:v libx264 \
  -preset medium \
  -crf 18 \
  -c:a aac \
  -b:a 160k \
  -movflags +faststart \
  "$output"

ffprobe \
  -v error \
  -show_entries format=filename,duration,size:stream=index,codec_name,codec_type,width,height \
  -of json \
  "$output"
