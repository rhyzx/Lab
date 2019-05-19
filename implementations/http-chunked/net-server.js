import net from 'net'

const crlf = (content) => content.replace(/\n/g, '\r\n')

let count = 0
const server = net.createServer(c => {
  console.log(`connect ${count++}`)

  c.write(`HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 40

abcdef
<script xsrc="foo.js"></script>
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
`)

})

server.listen(8000)
// setTimeout(() => server.close(), 5000)
