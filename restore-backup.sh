#!/bin/bash
# RashtraLink Emergency Restore Script
# Rolls back all code to the pristine pre-refactor snapshot stored in .backup_pre_refactor/

echo "Restoring RashtraLink codebase from .backup_pre_refactor..."
cp .backup_pre_refactor/index.html ./index.html
cp .backup_pre_refactor/mvp-interactive.js ./mvp-interactive.js
cp .backup_pre_refactor/package.json ./package.json
echo "Restore complete! Codebase is exactly at its original snapshot."
