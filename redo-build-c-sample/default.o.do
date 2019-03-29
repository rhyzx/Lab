redo-ifchange $2.depc
read DEPS <$2.depc
redo-ifchange $DEPS
cc -c -o $3 $2.c
