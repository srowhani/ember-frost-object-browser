export default function (server) {
  server.loadFixtures()
  server.createList('user', 200)
}
