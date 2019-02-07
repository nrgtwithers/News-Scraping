app.get("/all", (req, res) => {
    db.scrapedData.find({}, (err, data) => {
      res.send(data);
    });
  });
  
  app.get("/scrape", (req, res) => {
    axios.get("https://www.time.com").then(function(response) {
      const $ = cheerio.load(response.data);
  
      $(".headline").each(function(i, element) {
        const title = $(element)
          .children()
          .text();
        const link =
          "www.time.com" +
          $(element)
            .find("a")
            .attr("href");
  
        db.scrapedData.insert(
          {
            title: title,
            link: link
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          }
        );
      });
      console.log(results);
    });
  });