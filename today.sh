#!/bin/bash
MAX_ATTEMPTS=49
it=0
result=''
until [[ $result == *"DONE!"* && $it -ne 0 ]];
do
    ((it=it+1))
    result=$(node index.js)
    echo "iteration $it; node returned: $result"
    if [[ $it -eq $MAX_ATTEMPTS ]];
    then
        echo -e "\033[0;31m###MAX ATTEMPTS REACHED###\033[m"
        exit 1;
    fi
    if [[ $result == *"LOGIN KO!"* ]];
    then
        echo -e "\033[0;31m###REVIEW YOUR CREDENTIALS: LOGIN KO###\033[m"
        exit 1;
    fi
done