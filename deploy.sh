#!/bin/sh

#$releases_dir = '/mnt/devel7/apps/produtiivo-web-client-pro/releases';
#$app_dir = 'mnt/devel7/apps/produtiivo-web-client-pro';

echo "antes"
echo $REMOTE_APP_DIR
echo "depois"

releases_dir="$REMOTE_APP_DIR/releases";
release=$CI_COMMIT_REF_SLUG;
new_release_dir=$releases_dir/$release;

echo 'Cloning repository'
[ -d $releases_dir ] || mkdir $releases_dir
git clone --depth 1 $CI_REPOSITORY_URL $new_release_dir

echo 'Linking current release'
ln -nfs $new_release_dir "$REMOTE_APP_DIR/current"
