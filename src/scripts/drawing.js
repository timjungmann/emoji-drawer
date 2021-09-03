// * Elements
const canvas = document.querySelector("#canvas");
const emojiContent = document.getElementById("emoji");
const emojiButton = document.querySelector(".emoji-button");
const saveButton = document.querySelector(".save-button");
const clearButton = document.querySelector(".clear-button");
const sizeSlider = document.querySelector(".slider");


// * Get Emojis
let emojis;

async function fetchEmojis() {
  const data = await(await fetch('../emoji.json')).json();
  emojis = data;
  console.log(emojis);
}

fetchEmojis();


// * On Load
window.addEventListener("load",()=>{
  // * Variables
  let clickEnabled = true;

  var emoji = new Image();
  changeRandomEmoji()


  // * Emoji Change
  emojiButton.addEventListener("click", changeRandomEmoji)

  function getRandomEmoji(){
    const randomIndex = Math.floor(Math.random() * Object.keys(emojis).length);
    const randomEmoji = Object.keys(emojis)[randomIndex];
    console.log(randomEmoji);
    return randomEmoji;
  }

  function changeRandomEmoji(){
    if(clickEnabled){
      clickEnabled = false;
      myInterval = setInterval(()=>{
        const randomEmoji = getRandomEmoji();
        emojiContent.innerText = randomEmoji;
      }, 80);
      setTimeout(()=>{
        clearInterval(myInterval);
        const randomEmoji = getRandomEmoji();
        emojiContent.innerText = randomEmoji;
        emoji.src = emojis[randomEmoji];
        clickEnabled = true;
      }, 600)
    }
  } 


  // * Clear Canvas
  clearButton.addEventListener("click", clearCanvas)

  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // * Emoji Size
  sizeSlider.addEventListener("input", e=>{
    emoji_size = e.target.value;
    emojiContent.style.fontSize = `${e.target.value}px`
  })



  // * Canvas SetUp
  canvas.height = window.innerHeight-40;
  canvas.width = window.innerWidth-260;

  const ctx = canvas.getContext("2d");


  // * Canvas Variables & Functions
  let painting = false;
  let emoji_size = 75;

  startPosition = (e) => {
    var rect = e.target.getBoundingClientRect();
    painting = true;
    e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    draw(e);
  }

  endPosition = (e) => {
    if(painting){
      e.preventDefault();
      ctx.stroke();
      ctx.closePath();
      painting = false;
    }
  }

  draw = (e) => {
    var rect = e.target.getBoundingClientRect();
    if(!painting) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);

    ctx.drawImage(emoji, 0, 0, 150, 150, e.clientX - rect.left - (emoji_size/2), e.clientY - rect.top - (emoji_size/2), emoji_size, emoji_size)

    ctx.strokeStyle = "rgb(0,0,0,0)";
    
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }
 

  // * Canvas EventListeners
  canvas.addEventListener("mousedown", startPosition);
  window.addEventListener("mouseup", endPosition);
  // canvas.addEventListener("mouseout", endPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchmove", draw);
}, false);

// window.addEventListener("resize", ()=>{
//   canvas.height = window.innerHeight;
//   canvas.width = window.innerWidth;
// })