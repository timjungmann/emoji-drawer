// * Elements
const canvas = document.querySelector("#canvas");
const emojiContent = document.getElementById("emoji");
const emojiButton = document.querySelector(".emoji-button");
const saveButton = document.querySelector(".save-button");
const clearButton = document.querySelector(".clear-button");
const sizeSlider = document.querySelector(".slider");
const control = document.querySelector(".control");

// * Check if mobile
const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

// * Get Emojis
let emojis;

fetch("./emoji.json")
.then(res=>res.json())
.then(data=>emojis = data)
.then(()=>{
  // * Variables
  let clickEnabled = true;

  var emoji = new Image();
  // emoji.crossOrigin = 'Anonymous';
  changeRandomEmoji()


  // * Emoji Change
  emojiButton.addEventListener("click", changeRandomEmoji)

  function getRandomEmoji(){
    const randomIndex = Math.floor(Math.random() * Object.keys(emojis).length);
    const randomEmoji = Object.keys(emojis)[randomIndex];
    return randomEmoji;
  }

  function changeRandomEmoji(){
    if(isMobileDevice){
      const randomEmoji = getRandomEmoji();
      emojiContent.style.backgroundImage = `url(./images/${emojis[randomEmoji]})`;
      emoji.src = `./images/${emojis[randomEmoji]}`;
      clickEnabled = true;
    } else{
      if(clickEnabled){
        clickEnabled = false;
        myInterval = setInterval(()=>{
          const randomEmoji = getRandomEmoji();
          emojiContent.style.backgroundImage = `url(./images/${emojis[randomEmoji]})`;
        }, 80);
        setTimeout(()=>{
          clearInterval(myInterval);
          const randomEmoji = getRandomEmoji();
          emojiContent.style.backgroundImage = `url(./images/${emojis[randomEmoji]})`;
          emoji.src = `./images/${emojis[randomEmoji]}`;
          clickEnabled = true;
        }, 600)
      }
    }
  } 


  // * Clear Canvas
  clearButton.addEventListener("click", clearCanvas)

  function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // * Save as PNG
  saveButton.addEventListener("click", savePng)
  
  function savePng(){
    var link = document.getElementById('link');
    link.setAttribute('download', 'emoji-drawing.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
  };


  // * Emoji Size
  sizeSlider.addEventListener("input", e=>{
    emoji_size = e.target.value;
    emojiContent.style.height = `${e.target.value}px`;
    emojiContent.style.width = `${e.target.value}px`
  })



  // * Canvas SetUp
  const ctx = canvas.getContext("2d");
  let rect = canvas.getBoundingClientRect();

  canvas.height = rect.height * devicePixelRatio;
  canvas.width = rect.width * devicePixelRatio;

  ctx.scale(devicePixelRatio, devicePixelRatio);

  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";

  // * Canvas Variables & Functions
  let painting = false;
  let emoji_size = window.innerWidth < 993 ? 58 : 75;

  startPosition = (e) => {
    if(isMobileDevice){control.style.display = "none";}
    var rect = e.target.getBoundingClientRect();
    painting = true;
    e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    draw(e);
  }

  endPosition = (e) => {
    if(painting){
      if(isMobileDevice){control.style.display = "grid";}
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
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchmove", draw);
})
