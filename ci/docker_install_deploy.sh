#!/bin/sh

# We need to install dependencies only for Docker
#[[ ! -e /.dockerenv ]] && exit 0

set -xe

CLOUD_SDK_VERSION='388.0.0'

export PATH=`pwd`/google-cloud-sdk/bin:$PATH

apk --no-cache add \
        bash \
        curl \
        python3 \
        py-crcmod \
        bash \
        libc6-compat \
        openssh-client \
        git

curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz
tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz
rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz
ln -s /lib /lib64
gcloud config set core/disable_usage_reporting true
gcloud config set component_manager/disable_update_check true
gcloud config set metrics/environment github_docker_image
gcloud --version
gcloud components install kubectl
