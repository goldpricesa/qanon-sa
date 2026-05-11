#!/bin/sh
set -e

MODEL_ANSWER="${OLLAMA_ANSWER_MODEL:-qwen2.5:7b-instruct}"
MODEL_CLASSIFIER="${OLLAMA_CLASSIFIER_MODEL:-$MODEL_ANSWER}"

echo "[ollama] Pulling answer model: $MODEL_ANSWER"
ollama pull "$MODEL_ANSWER"

if [ "$MODEL_CLASSIFIER" != "$MODEL_ANSWER" ]; then
    echo "[ollama] Pulling classifier model: $MODEL_CLASSIFIER"
    ollama pull "$MODEL_CLASSIFIER"
fi

echo "[ollama] Models ready."
