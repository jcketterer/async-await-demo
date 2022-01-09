// async function sayHi() {
//   return 'HELLO!';
// }

// function sayHi() {
//   return Promise.resolve('HELLO!!');
// }

// async function oosp() {
//   throw 'bad IDEA!';
// }

// sayHi().then((msg) => console.log(msg));

// oosp()
//   .then((msg) => console.log(msg))
//   .catch((err) => console.log('Inside the catch: ', err));

// async function getStarWarsFilms() {
//   console.log('starting');
//   const res = await axios.get('https://swapi.dev/api/films/');
//   console.log('ending');
//   console.log(res);
// }

//Example without async/await
// console.log('Start');
// axios.get('https://swapi.dev/api/films/').then((res) => {
//   console.log('ending');
//   console.log(res.data.results);
// });

//********************** COLOR CHANGING EXAMPLE with no API *************************

// const h1 = document.querySelector('h1');

// function changeColor(el, color) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       el.style.color = color;
//       resolve();
//     }, 1000);
//   });
// }

// changeColor(h1, 'red')
//   .then(() => changeColor(h1, 'orange'))
//   .then(() => changeColor(h1, 'yellow'))
//   .then(() => changeColor(h1, 'green'))
//   .then(() => changeColor(h1, 'blue'))
//   .then(() => changeColor(h1, 'indigo'))
//   .then(() => changeColor(h1, 'violet'));

// async function rainbow(el) {
//   await changeColor(el, 'red');
//   await changeColor(el, 'orange');
//   await changeColor(el, 'yellow');
//   await changeColor(el, 'green');
//   await changeColor(el, 'blue');
//   await changeColor(el, 'indigo');
//   await changeColor(el, 'violet');
// }

// rainbow(h1);

// ***************** USING ASYNC/AWAIT AS AN OBJECT **********************

// const deck = {
//   async init() {
//     let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
//     this.deckID = res.data.deck_id
//   },
//   async shuffle() {
//     let res = await axios.get(
//       `http://deckofcardsapi.com/api/deck/${this.deckID}/shuffle/`,
//     )
//     console.log(res)
//   },
//   async drawCard() {
//     let res = await axios.get(
//       `http://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`,
//     )
//     console.log(res.data)
//   },
// }

//***************** ASYNC/AWAIT AS A CLASS ****************************

// class Pokemon {
//   constructor(id) {
//     this.id = id
//     this.types = []
//   }
//   async getInfo() {
//     let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
//     this.name = res.data.name
//     for (let type of res.data.types) {
//       this.types.push(type.type.name)
//     }
//   }
// }

// ************************* REFACTORING WITH PROMISES ***********************

// let baseCallback = 'https://pokeapi.co/api/v2/pokemon'

// $.getJSON(`${baseCallback}/1/`, (p1) => {
//   console.log(`First Pokemon Found: ${p1.name}`)
//   $.getJSON(`${baseCallback}/2/`, (p2) => {
//     console.log(`Second Pokemon Found: ${p2.name}`)
//     $.getJSON(`${baseCallback}/3/`, (p3) => {
//       console.log(`Third Pokemon Found: ${p3.name}`)
//     })
//   })
// })

// function get3Pokemon() {
//   let baseURL = 'https://pokeapi.co/api/v2/pokemon'
//   axios
//     .get(`${baseURL}/1`)
//     .then((data) => {
//       console.log(`The first pokemon is ${data.name}`)
//       return axios.get(`${baseURL}/2`)
//     })
//     .then((data) => {
//       console.log(`The second pokemon is ${data.name}`)
//       return axios.get(`${baseURL}/3`)
//     })
//     .then((data) => {
//       console.log(`The third pokemon is ${data.name}`)
//     })
// }

//******************SAME FUNCTION BUT ASYNC**************************
////WITH ASYNC
// async function get3PokemonAsync() {
//   let baseURL = 'https://pokeapi.co/api/v2/pokemon'
//   let { data: p1 } = await axios.get(`${baseURL}/1`)
//   console.log(p1.name)
//   let { data: p2 } = await axios.get(`${baseURL}/2`)
//   console.log(p2.name)
//   let { data: p3 } = await axios.get(`${baseURL}/3`)
//   console.log(p3.name)

//// WITHOUT ASYNC/AWAIT
//   .then((data) => {
//     console.log(`The first pokemon is ${data.name}`)
//     return axios.get(`${baseURL}/2`)
//   })
//   .then((data) => {
//     console.log(`The second pokemon is ${data.name}`)
//     return axios.get(`${baseURL}/3`)
//   })
//   .then((data) => {
//     console.log(`The third pokemon is ${data.name}`)
//   })
// }

//****************FINAL REFACTORED VERSION WITH PARALLEL'S *********************

// async function catchSomeOfEmParallel() {
//   let baseURL = 'https://pokeapi.co/api/v2/pokemon'
//   let p1Promise = $.getJSON(`${baseURL}/1/`)
//   let p2Promise = $.getJSON(`${baseURL}/2/`)
//   let p3Promise = $.getJSON(`${baseURL}/3/`)

//   let p1 = await p1Promise
//   let p2 = await p2Promise
//   let p3 = await p3Promise

//   console.log(`The first pokemon is ${p1.name}`)
//   console.log(`The second pokemon is ${p2.name}`)
//   console.log(`The third pokemon is ${p3.name}`)
// }

// catchSomeOfEmParallel()

async function catchSomeOfEmParallel() {
  let baseURL = 'https://pokeapi.co/api/v2/pokemon'
  let pokemon = await Promise.all([
    axios.get(`${baseURL}/1/`),
    axios.get(`${baseURL}/2/`),
    axios.get(`${baseURL}/3/`),
  ])

  console.log(`The first pokemon is ${pokemon[0].data.name}`)
  console.log(`The second pokemon is ${pokemon[1].data.name}`)
  console.log(`The third pokemon is ${pokemon[2].data.name}`)
}

catchSomeOfEmParallel()
