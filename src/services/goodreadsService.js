function goodreadsService() {
  function getBookById() {
    return new Promise((resolve, reject) => {
      resolve({ description: 'my description' });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
