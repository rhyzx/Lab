redo-ifchange $2.c
# TODO generate dep file will also gen o file
cc -MMD -MF - -o /dev/null -c $2.c |
ruby -e "puts ARGF.first.split().drop(2).join(' ')" > $3
