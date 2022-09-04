class TestController {
  name(request, response) {
    return response.json({
      nome: "luis"
    })
  }
}

module.exports = new TestController();