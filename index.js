//export parse function to read file
const { parse } = require('csv-parse');

//import file system functionality
const fs =  require('fs');

const habitablePlanets = [];

//filter planets that are habitable
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
  && planet['koi_insol'] > 0.36 && planet['koi_insol'] > 1.11
  && planet['koi_prad'] < 1.6; //return object that matches this property
}

//read file piece by piece using Stream API
fs.createReadStream('kepler_data.csv')
.pipe(parse({  //use pipe to connect with stream to process(write) the data
  comment: '#',  //tell to treat lines starting with # as a comment
  columns: true, //return: value pairs
}))  
.on('data', data => {
  if(isHabitablePlanet(data)) {
    habitablePlanets.push(data); //store data in the results array
  }
})
.on('error', (error) => { //response to error
  console.log(error);
})
.on('end', () => { //event when the data ends
  console.log(habitablePlanets.map((planet) => { //display the found planets' names
    return planet['kepler_name'];
  }));
 console.log(`${habitablePlanets.length} habitable planets found.`);
 console.log('Done procssing the file data.');
});