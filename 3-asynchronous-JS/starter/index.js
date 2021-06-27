const { error } = require('console');
const fs = require('fs')
const superagent = require('superagent')


const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file 😢');
      resolve(data);
    });
  });
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) reject('I could not find that file😅')
      resolve('success')
    })
  })
}

const getDogPic = async () => {
  try {

    const data = await readFilePromise(`${__dirname}/dog.txt`)
    console.log('data', data);
    
    const resPro1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const resPro2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    const resPro3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    
    const all = await Promise.all([resPro1, resPro2, resPro3])
    const images = all.map(el => el.body.message)
    console.log(images);

    
    await writeFilePromise('dog-img.txt', images.join('\n'))
    console.log('Random dog image saved to file');
  } catch(err) {
    console.log(err);
    throw(err)
  }
  return '2: ready 🐶'
}

(async()=> {
  try {
    console.log('1: will get dog pics');
    await getDogPic()
    console.log('3: Done getting dog pics');
  } catch(err) {
    console.log('ERROR 💥')
  }
})()

/* 
console.log('1: will get dog pics');
getDogPic().then((result) => {
  console.log(result);
  console.log('3: Done getting dog pics');
}).catch(err => {
  console.log('ERROR 💥')
})
 */


/* readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log('first');
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
    
  .then(res => {
    console.log(res.body.message);
    return writeFilePromise('dog-img.txt', res.body.message)
  })

  .then(() => {
    console.log('Random dog image saved to file');
  })
    
  .catch(err => {
    console.log(err);
  })
 */

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);


//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         if (err) return console.log(err.message);

//         console.log('Rondom dog image saved to file');
//       })
//     })
//     .catch(err => {
//       console.log(err.message);
//     })
// })

