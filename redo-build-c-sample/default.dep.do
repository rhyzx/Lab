redo-ifchange $2.c
# TODO generate dep file will alse gen o file
cc -MMD -MF $3 -o /dev/null -c $2.c
