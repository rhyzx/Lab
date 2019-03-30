redo-ifchange $2.depo
read DEPS <$2.depo
redo-ifchange $2.o $DEPS
cc -o $3 $2.o $DEPS
