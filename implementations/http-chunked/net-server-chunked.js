import net from 'net'

const crlf = (content) => content.replace(/\n/g, '\r\n')
// const chunk

const server = net.createServer(c => {
  console.log('connect')

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
  // c.end()
  c.destroy()
})

server.listen(8000)
// setTimeout(() => server.close(), 5000)
