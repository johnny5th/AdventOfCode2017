# variables
count=0
prevChar=""
fileName="1.txt"

# getting text and length
text=$(cat $fileName)
length=$(($(echo $text | wc -c) - 1))
offset=$((length/2))

# looping through EVERY char in string
for (( i=0; i<${#text}; i++ )); do

    # checking if char position will be larger than length
    if [[ "$((i + offset))" > "$length" ]]; then
        # number needs to wrap

        wrapVal="$((i + offset - length))"
        if [ "${text:$i:1}" == "${text:$wrapVal:1}" ]; then
            ((count += "${text:$i:1}"))
        fi
    else
        # number doesn't need to wrap
        
        if [ "${text:$i:1}" == "${text:$((i + offset)):1}" ]; then
            ((count += "${text:$i:1}"))
        fi
    fi

done

echo "Count: $count"
