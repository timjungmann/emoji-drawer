const canvas = document.querySelector("#canvas");

window.addEventListener("load",()=>{
  var emoji = new Image();
  emoji.src = 'https://e.unicode-table.com/orig/2d/0dc3e41814ebcb843bfcdada0a6315.png';

  //SetUp
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const ctx = canvas.getContext("2d");

  //variables & functions
  let painting = false;

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

    ctx.drawImage(emoji, 0, 0, 150, 150, e.clientX - rect.left, e.clientY - rect.top, 100, 100)

    ctx.strokeStyle = "rgb(0,0,0,0)";
    
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }
 
  //EventListeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchmove", draw);


}, false);

window.addEventListener("resize", ()=>{
  canvas.height = window.innerHeight;
  canvas.width = window. innerWidth;

})