#!/bin/bash
if [[ $(uname -m) == 'arm64' ]]; then
    echo 'M chip detected; please, use script install.sh one time, and daily, your today.sh.'
else
    echo 'You can run using Docker, or locally (use script install.sh one time, and daily, your today.sh).'
fi