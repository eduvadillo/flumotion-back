const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/album", (req, res, next) => {
  const { artist, album } = req.body;

  console.log(artist, album);

  const songs = [];

  axios
    .get(`https://itunes.apple.com/search?term=${artist}`)
    .then((response) => {
      response.data.results.map((song) => {
        song.trackName === album ? songs.push(song) : console.log(`no hay la cancion`);
      });

      res.json(songs);

      /*       if (songs.length !== 0) {
        res.json(songs);
      } else {
        axios.get(`https://itunes.apple.com/search?term=${artist}&limit=4`).then((response) => {
          res.json(response.data.results);
        });
      } */
    })
    .catch((err) => res.json(err));
});
// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.post("/song-not-find", (req, res, next) => {
  const { artist, album } = req.body;

  console.log(`he llegado al not find`);

  axios
    .get(`https://itunes.apple.com/search?term=${artist}&limit=4`)
    .then((response) => {
      res.json(response.data.results);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
