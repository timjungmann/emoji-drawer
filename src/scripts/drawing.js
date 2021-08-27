const canvas = document.querySelector("#canvas");

window.addEventListener("load",()=>{
  //SetUp
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const ctx = canvas.getContext("2d");

  //variables & functions  
  let painting = false;

  startPosition = (e) => {
    painting = true;
    draw(e);
  }

  endPosition = () => {
    painting = false;
    ctx.beginPath();
  }

  draw = (e) => {
    if(!painting) return;
    var rect = e.target.getBoundingClientRect();

    ctx.lineWidth = 14;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }
 
  //EventListeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);


})

window.addEventListener("resize", ()=>{
  canvas.height = window.innerHeight;
  canvas.width = window. innerWidth;

})