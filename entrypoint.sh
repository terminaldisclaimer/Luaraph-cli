#!/bin/sh

cd $INPUT_PROJECTDIR

cmd="node /app/luraph/app.js -a $API_KEY -i $INPUT_INPUTFILE -o $INPUT_OUTPUTFILE"


eval $cmd