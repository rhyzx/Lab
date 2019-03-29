redo-ifchange $2.depo
read DEPS <$2.depo
redo-ifchange $DEPS
cc -o $3 $DEPS
