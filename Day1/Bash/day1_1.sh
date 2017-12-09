# variables
count=0
prevChar=""
fileName="1.txt"

# getting text and length
text=$(cat $fileName)
length=$(echo $text | wc -c)

# getting first char and last char (account for 0 based array)
first=${text:0:1}
last=${text:$length-2:1}

# looping through EVERY char in string
for (( i=0; i<${#text}; i++ )); do

    # checking to see if prev char was same as current char
    if [ "${text:$i:1}" == "$prevChar" ]; then
		# char is same as prev
		((count=count + "${text:$i:1}"))
    fi
    
    # setting prevChar
    prevChar="${text:$i:1}"
done

# checking if first and last chars are the same
if [ "$first" == "$last" ]; then

	# first and last are the same
	((count=count + $first))
fi

echo "Count: $count"
