#!/bin/sh

cd $INPUT_PROJECTDIR

cmd="node /app/luraph/app.js -a $SECRET_LURAPH_KEY -i $INPUT_INPUTFILE -o $INPUT_OUTPUTFILE"


eval $cmd