import net from 'net'

const server = net.createServer(c => {
  c.write(`HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

`)

  c.write(`3
con
`)
  c.write(`0

`)

  c.on('end', () => { console.log('bye') })
  c.end()
})

server.listen(8000)
// setTimeout(() => server.close(), 5000)
