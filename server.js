const express =require( 'express');
const mongoose = require( 'mongoose');
const coll=require('./model')
const data=require('./data')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/lastca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.get(
    '/seed',(async (req, res) => {
      // await Product.remove({});
      const createdProducts = await coll.insertMany(data.users);
      res.send({ createdProducts });
    })
  );
  app.get("/get", (req, res) => {
    coll.find({
        location:
       { $near:
          {
            $geometry: { type: "Point",  coordinates: [ -73.9667, 40.78 ] },
            $minDistance: 1000,
            $maxDistance: 5000
          }
       }
    }, (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    });
  });
  app.get("/all", (req, res) => {
    coll.find({}, (err, result) => {
      if (err) console.log(err);
      else {
        res.send(result);
      }
    });
  });
  /*app.get("/near", (req, res) => {
      coll.aggregate( [
          {
        $geoNear: {
            near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
            spherical: true,
            query: { category: "Parks" },
            distanceField: "calcDistance"
         }
        }
        ] ), (err, result) => {
        if (err) console.log(err);
        else {
          res.send(result);
        }
      }

    });*/

app.get('/', (req, res) => {
  res.send('Server is ready');
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
