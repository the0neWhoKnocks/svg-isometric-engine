#! /bin/bash

CURR_DIR=$PWD
TEMP_PATH="./.temp"
SVG_PATH="./src/static/svgs"

if [ ! -d "$SVG_PATH" ]; then
  mkdir -p $SVG_PATH

  if [ ! -d "$TEMP_PATH" ]; then
    mkdir -p $TEMP_PATH
    cd $TEMP_PATH
    git init
    git remote add -f origin https://github.com/google/material-design-icons
    git config core.sparseCheckout true
    echo "sprites/svg-sprite/" >> .git/info/sparse-checkout
    git pull origin master
    cd $CURR_DIR
  fi

  # cp **/*.xls target_directory
  cp $TEMP_PATH/sprites/svg-sprite/*.svg $SVG_PATH
fi
