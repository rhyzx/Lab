GET_BASENAME=$(cat <<-END
puts ARGF.first.split().map {|name| File.basename(name, '.h')}.join(' ')
END
)
SET_EXTENSION=$(cat <<-END
puts ARGV.first.split().map {|name| "#{name}#{ARGV[1]}" }.join(' ')
END
)
# TODO read by command
READ=$(cat <<-END
puts ARGV.first.split().map {|name| File.read(name) }.join(' ')
END
)

###########
redo-ifchange $2.depc

BASENAMES=`ruby -e "$GET_BASENAME" $2.depc`
OTHER_DEPOS=`ruby -e "$SET_EXTENSION" "$BASENAMES" '.depo'`

# echo $BASENAMES > $3
# echo $BASENAMES $OTHER_DEPOS > $3
redo-ifchange $OTHER_DEPOS

DEPS=`ruby -e "$SET_EXTENSION" "$BASENAMES" '.o'`
OTHER_DEPS=`ruby -e "$READ" "$OTHER_DEPOS"`
echo $DEPS $OTHER_DEPS > $3
