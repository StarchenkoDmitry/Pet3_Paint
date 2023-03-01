const canv = document.getElementById("canvas");
const ctx  = canv.getContext('2d');

const articleDiv = document.getElementById("palitra-list");
const doc_cords = document.getElementById("block-cords");
const doc_block_widthline_list = document.getElementById("block-widthline-list");

const Element_mouseL = document.getElementById("mouseL");
const Element_mouseR = document.getElementById("mouseR");

const canvBackgroundColor = "rgb(255, 255, 255)";
let curentColorL = "rgb(0, 0, 255)";
let curentColorR = "rgb(255, 0, 0)";


const Tool_Pencil = Symbol();
const Tool_Pouring = Symbol();
// const Tool_Pipetka = Symbol();
// const Tool_Lastik = Symbol();
// const Tool_Text = Symbol();
let currentTool = Tool_Pencil;


let currentWidthLine = 16;
const CONST_WidthLine = [4,8,16];
const CONST_WidthLineForStyleElement = [4,8,16];
createWidthLineList();


setColorMouseL(curentColorL);
setColorMouseR(curentColorR);

let currentHeaderHeight = document.getElementById("header").clientHeight;
let currentMainDrawWidth = document.getElementById("main-draw").clientWidth;
let currentMainDrawHeight = document.getElementById("main-draw").clientHeight;


const selectLang = document.getElementById("block-language-list");
const listLang = ["en","ru","ua"];




const canvDefMinWidth = 100;
const canvDefMinHeight = 100;
const borderForCanv = 50;
const helf_borderForCanv = borderForCanv / 2;

const cavnDefY = currentHeaderHeight+(helf_borderForCanv);
const cavnDefX = helf_borderForCanv;
let canvWidth = currentMainDrawWidth > canvDefMinWidth? currentMainDrawWidth-borderForCanv : canvDefMinWidth;
let canvHeight = currentMainDrawHeight > canvDefMinHeight? currentMainDrawHeight-borderForCanv : canvDefMinHeight;
let currentCanvWidth = canvWidth;
let currentCanvHeight = canvHeight;
let canvContext2DWidth = currentMainDrawWidth > canvDefMinWidth? currentMainDrawWidth-borderForCanv : canvDefMinWidth;
let canvContext2DHeight = currentMainDrawHeight > canvDefMinHeight? currentMainDrawHeight-borderForCanv : canvDefMinHeight;


setCanvSizeStyle(canvWidth,canvHeight);
setCanvTopLeft(cavnDefX,cavnDefY);
setCanvSizeContex2D(canvContext2DWidth,canvContext2DHeight);
drawFillBackground();
// DrawMesh();



function DrawMesh(){
  for(let p= 0; p < canvContext2DWidth;p+=100){
    drawLine(p,0, p,canvContext2DHeight, "rgb(100, 100, 100)",1);
  }
  for(let p= 0; p < canvContext2DHeight;p+=100){
    drawLine(0,p, canvContext2DWidth,p, "rgb(100, 100, 100)",1);
  }
}




const CONST_Scales=[0.125,0.25,0.5,1,2,3,4,5,6,7,8];
const CONST_DEF_Sacle = 3;
let currentNumberScales = CONST_DEF_Sacle;
let currentScale = CONST_Scales[currentNumberScales];

function ScaleUp(){
  if(currentNumberScales < CONST_Scales.length-1){
    currentNumberScales++;
    const nSclae = CONST_Scales[currentNumberScales];
    const cTL = getCanvTopLeft();

    const cW = currentCanvWidth;
    const cH = currentCanvHeight;

    const mcx = mouseCords.x_window;
    const mcy = mouseCords.y_window;

    const px = (mcx-cTL.left) / cW;
    const py = (mcy-cTL.top) / cH;

    const newWidth = canvWidth * nSclae;
    const newHeight = canvHeight * nSclae;

    const nl =  mcx - (newWidth * px);
    const nt =  mcy - (newHeight * py);

    setCanvSizeStyle(canvWidth * nSclae,canvHeight * nSclae)
    setCanvTopLeft(nl,nt);

  }
}
function ScaleDown(){
  if(currentNumberScales >= 1){
    currentNumberScales--;
    const nSclae = CONST_Scales[currentNumberScales];
    const cTL = getCanvTopLeft();

    const cW = currentCanvWidth;
    const cH = currentCanvHeight;

    const mcx = mouseCords.x_window;
    const mcy = mouseCords.y_window;

    const px = (mcx-cTL.left) / cW;
    const py = (mcy-cTL.top) / cH;


    const nl =  mcx -  (canvWidth * nSclae) * px;
    const nt =  mcy -  (canvHeight * nSclae) * py;

    setCanvSizeStyle(canvWidth * nSclae,canvHeight * nSclae)
    setCanvTopLeft(nl,nt);
  }
}


window.onresize = (e)=>{
  currentHeaderHeight = document.getElementById("header").clientHeight;
  currentMainDrawWidth = document.getElementById("main-draw").clientWidth;
  currentMainDrawHeight = document.getElementById("main-draw").clientHeight;
}

function setCanvTopLeft(left,top){

  if(left > currentMainDrawWidth - helf_borderForCanv){ left = currentMainDrawWidth - helf_borderForCanv; }
  if(top >  currentHeaderHeight + currentMainDrawHeight - helf_borderForCanv){ top = currentHeaderHeight + currentMainDrawHeight - helf_borderForCanv; }

  if (left <  helf_borderForCanv - currentCanvWidth){ left = helf_borderForCanv - currentCanvWidth; }
  if (top <   currentHeaderHeight + helf_borderForCanv - currentCanvHeight){ top = currentHeaderHeight + helf_borderForCanv - currentCanvHeight; }



  canv.style.top = `${top}px`;
  canv.style.left = `${left}px`;
}



function getCanvTopLeft(){
  return {top: parseFloat(canv.style.top),left:parseFloat(canv.style.left) };
}

function setCanvSizeStyle(width, height){
  if(width<= 1) {width = 1;}
  if(height <=1){ height = 1;}
  currentCanvWidth = width;
  currentCanvHeight = height;
  canv.style.width = `${width}px`;
  canv.style.height =`${height}px`;
}

function setCanvSizeContex2D(width, height){
  canvContext2DWidth = width;
  canvContext2DHeight = height;
  canv.width = width;
  canv.height = height;
}

const CONST_whichClick_MouseLeft = 1;
const CONST_whichClick_MouseRight = 3;
const CONST_whichClick_MouseCenter = 2;

const mouseCords={
  isDown: false,
  isEnter: false,
  isAltDown: false,
  isShiftDown: false,

  whichClick: 1,/*From 1 to 3, witch [1,2,3]*/

  x_scrole: 0,
  y_scrole: 0,

  x_window: 0,
  y_window: 0,
  x_window_old: 0,
  y_window_old: 0,

  x:0,
  y:0,
  x_old:0,
  y_old:0,

  getDeltaX: function(){
    return  this.x - this.x_old;
  },
  getDeltaY: function(){
    return this.y - this.y_old;
  },
  getDeltaXWindow: function(){
    return  this.x_window - this.x_window_old;
  },
  getDeltaYWindow: function(){
    return this.y_window - this.y_window_old;
  }
}

window.onmousemove = (e)=>{  
  const x = e.pageX;
  const y = e.pageY;
  mouseCords.x_window_old =  mouseCords.x_window;
  mouseCords.y_window_old =  mouseCords.y_window;
  mouseCords.x_window = x;
  mouseCords.y_window = y;

  if (mouseCords.isAltDown && !mouseCords.isShiftDown){
    if(mouseCords.isDown){
      if(mouseCords.whichClick === CONST_whichClick_MouseLeft || mouseCords.whichClick === CONST_whichClick_MouseRight){
        canvMove(mouseCords.getDeltaYWindow(),mouseCords.getDeltaXWindow());
      }
    }
  }
}



function changeTool(str){
  if(str === "Pencil"){
    currentTool = Tool_Pencil;
  }
  else if(str ==="Pouring"){
    currentTool = Tool_Pouring;
  }
}




for(let p = 0;p <CONST_colorsList.length;p++){
  articleDiv.innerHTML+=`<div class="palitra-item">
  <div class="palitra-item-color" style="background-color: ${CONST_colorsList[p]};"></div>
  </div>`;
}

Array.from(document.getElementsByClassName("palitra-item-color")).forEach(e =>{
  e.addEventListener("click",()=>{
    setColorMouseL(e.style.backgroundColor);
    createWidthLineList();
  });
  e.addEventListener('contextmenu', (event) => {
    setColorMouseR(e.style.backgroundColor);
    event.preventDefault(); 
  });
});




function createWidthLineList(){
  doc_block_widthline_list.innerHTML = "";
  for(let p =0;p < CONST_WidthLine.length;p++){
    doc_block_widthline_list.innerHTML+=createElementWidthLine(CONST_WidthLine[p], CONST_WidthLineForStyleElement[p],curentColorL);
  }
}

function createElementWidthLine(widthLine,widthLineForStyleElement, colorStyle){
  return `<div onclick="changeWidthLine(${widthLine});" class="block-widthline-item"><div style="height: ${widthLineForStyleElement}px;  background-color: ${colorStyle}"></div></div>`;
}
function changeWidthLine(widthLine){
  currentWidthLine = widthLine;
}



function setColorMouseL(str){
  curentColorL = str;
  Element_mouseL.style.backgroundColor = curentColorL;
}

function setColorMouseR(str){
  curentColorR = str;
  Element_mouseR.style.backgroundColor = curentColorR;
}



canv.addEventListener('contextmenu', (e) => {
  e.preventDefault(); 
});



function canvMove(deltaTop, deltaLeft, moveCoficent = 1){
  const currentRect = getCanvTopLeft();
  setCanvTopLeft(currentRect.left + deltaLeft*moveCoficent,currentRect.top + deltaTop * moveCoficent);
}

const CONST_Key_Shift = 16;
const CONST_Key_Alt = 18;

window.onkeydown = (e)=>{
  if(e.keyCode === CONST_Key_Shift){
    mouseCords.isShiftDown = true;
  }
  if(e.keyCode === CONST_Key_Alt){
    mouseCords.isAltDown = true;
  }
}

window.onkeyup = (e)=>{
  if(e.keyCode === CONST_Key_Shift){
    mouseCords.isShiftDown = false;
  }
  if(e.keyCode === CONST_Key_Alt){
    mouseCords.isAltDown = false;
  }
}


window.onwheel = (e)=>{
  const x = e.pageX;
  const y = e.pageY;
  mouseCords.x_scrole = x;
  mouseCords.y_scrole = y;
  
  if(!mouseCords.isAltDown){
    if(mouseCords.isShiftDown){
      canvMove(0, e.deltaY,.2);
    }
    else{
      canvMove(-e.deltaY, 0,.2);
    }
  }
  else{
    if(e.deltaY < 0){
      ScaleUp();
    }
    else{
      ScaleDown();
    }
  }
}


canv.onmouseenter = (e)=>{
  const x = e.offsetX;
  const y = e.offsetY;

  mouseCords.x_old = x;
  mouseCords.y_old = y;

  mouseCords.x = x;
  mouseCords.y = y;

  mouseCords.isEnter =true;
  

}

canv.onmouseleave = (e)=>{
  const x = e.offsetX;
  const y = e.offsetY;

  mouseCords.x_old = mouseCords.x;
  mouseCords.y_old = mouseCords.y;

  mouseCords.x = x;
  mouseCords.y = y;


  mouseCords.isEnter =false;
  doc_cords.innerHTML = "";/*`(0, 0)px`;*/
}



canv.onmousemove = (e) =>{
  const x = e.offsetX;
  const y = e.offsetY;

  mouseCords.x_old = mouseCords.x;
  mouseCords.y_old = mouseCords.y;

  mouseCords.x = x;
  mouseCords.y = y;

  if(!mouseCords.isAltDown && !mouseCords.isShiftDown){
    if(mouseCords.isDown){

      const fx = mouseCords.x_old / currentCanvWidth * canvContext2DWidth;
      const fy = mouseCords.y_old / currentCanvHeight * canvContext2DHeight;
      const tx = mouseCords.x / currentCanvWidth * canvContext2DWidth;
      const ty = mouseCords.y / currentCanvHeight * canvContext2DHeight;

      if(currentTool === Tool_Pencil){
        if(mouseCords.whichClick === CONST_whichClick_MouseLeft){
          drawLine(fx,fy,tx,ty, curentColorL,currentWidthLine);
        }
        else if(mouseCords.whichClick === CONST_whichClick_MouseRight){
          drawLine(fx,fy,tx,ty, curentColorR,currentWidthLine);
        }
      }
    }
  }

  if(mouseCords.isOver){
    doc_cords.innerHTML = `(${mouseCords.x}, ${mouseCords.y})px`;
  }
}



canv.onmousedown = function(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  mouseCords.isDown = true;
  mouseCords.whichClick = e.which;
  mouseCords.x = x;
  mouseCords.y = y;
  mouseCords.x_old = x;
  mouseCords.y_old = y;
  
  if(currentTool === Tool_Pouring){
    const px =  Math.round(x / currentCanvWidth * canvContext2DWidth);
    const py = Math.round(y / currentCanvHeight * canvContext2DHeight);
    
    if((px < 0 || px >= canvContext2DWidth) || (py < 0 && py >= canvContext2DHeight)) return;

    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let data = imgData.data;

    const recLen = data.byteLength;
    let rec = new Array(recLen);
    for(let p = 0;p < recLen;p++){ rec[p] = 0; }

    const cPixel = getPixel(px,py,data,canvContext2DWidth);
    const cColor = getRGB(curentColorL);

    setRec(px,py,rec,1,canvContext2DWidth);
    const listOnCh = [{x:px,y:py}];
    let cnList = 0;


    while(cnList < listOnCh.length){
      const p = listOnCh[cnList];
      if(getRec(p.x,p.y,rec,canvContext2DWidth) != 1) {
        cnList++;
        continue;
      }
      setRec(p.x,p.y,rec,2,canvContext2DWidth);
      const pix = getPixel(p.x,p.y,data,canvContext2DWidth);
      
      if(prosRazPixel(pix,cPixel) > .80){
        setPixel(p.x,p.y,data,canvContext2DWidth,cColor);
      }else{
        cnList++;
        continue;
      }
      
      if(p.x >0){
        if(getRec(p.x-1,p.y,rec,canvContext2DWidth) === 0){
          setRec(p.x-1,p.y,rec,1,canvContext2DWidth);
          listOnCh.push({x:p.x-1 ,y:p.y });
        }
      }
      if(p.y >0){
        if(getRec(p.x,p.y-1,rec,canvContext2DWidth) === 0){
          setRec(p.x,p.y-1,rec,1,canvContext2DWidth);
          listOnCh.push({x:p.x ,y:p.y-1 });
        }
      }
      if(p.x < canvContext2DWidth-1){
        if(getRec(p.x+1,p.y,rec,canvContext2DWidth) === 0){ 
          setRec(p.x+1,p.y,rec,1,canvContext2DWidth);
          listOnCh.push({x:p.x +1 ,y:p.y });
        }
      }
      if(p.y <canvContext2DHeight - 1){
        if(getRec(p.x,p.y+1,rec,canvContext2DWidth) === 0){ 
          setRec(p.x,p.y+1,rec,1,canvContext2DWidth);
          listOnCh.push({x:p.x ,y:p.y+1 });
        }
      }
      cnList++;
    }
    ctx.putImageData(imgData,0,0);
  }
}

function getRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? [Number.parseInt(match[1]),Number.parseInt(match[2]),Number.parseInt(match[3])] : [0,0,0];
}

function prosRazPixel(pix,pixt){
  const x1 =  (255 - Math.abs(pix[0]-pixt[0]))/255;
  const x2 =  (255 - Math.abs(pix[1]-pixt[1]))/255;
  const x3 =  (255 - Math.abs(pix[2]-pixt[2]))/255;
  return x1*x2*x3;
}

function setRec(x,y,rec,r,w){
  const cord_pixel = x + y*w;
  rec[cord_pixel] = r;
}
function getRec(x,y,rec,w){
  const cord_pixel = x + y*w;
  return rec[cord_pixel];
}

function getPixel(x, y, data,w){
  const cord_pixel = x*4 + y*w*4;
  if(cord_pixel <= data.byteLength - 4){
    return [data[cord_pixel],data[cord_pixel+1],data[cord_pixel+2]];
  }
  else{
    throw new Error('Parameter is bigest than data.byteLength!'); 
  }
}
function setPixel(x, y, data,w, pix){  
  const cord_pixel = x*4 + y*w*4;
  data[cord_pixel] = pix[0];
  data[cord_pixel + 1] = pix[1];
  data[cord_pixel + 2] = pix[2];
}





canv.onmouseup = function(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  mouseCords.isDown = false;
  mouseCords.x = x;
  mouseCords.y = y;
  mouseCords.x_old = x;
  mouseCords.y_old = y;
}
window.onmousedown = (e)=>{  
  const x = e.pageX;
  const y = e.pageY;
  mouseCords.x_window_old =  x;
  mouseCords.y_window_old =  y;
  mouseCords.x_window = x;
  mouseCords.y_window = y;
}

window.onmouseup = (e) =>{
  mouseCords.isDown = false;
  const x = e.pageX;
  const y = e.pageY;
  mouseCords.x_window_old =  mouseCords.x_window;
  mouseCords.y_window_old =  mouseCords.y_window;
  mouseCords.x_window = x;
  mouseCords.y_window = y;
}

function drawFillBackground(){
  ctx.fillStyle = canvBackgroundColor;
  ctx.fillRect(0,0,canv.width,canv.height);
}

function drawLine(bx,by,ex,ey,lineColor,width=10){
  ctx.beginPath();
  ctx.moveTo(bx,by);
  ctx.lineTo(ex, ey);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = width;
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = lineColor;
  ctx.arc(bx, by, width/2, 0, 2 * Math.PI, true);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = lineColor;
  ctx.arc(ex, ey, width/2, 0, 2 * Math.PI, true);
  ctx.fill();
}


function changeSize(){
  const nwidth = parseInt(document.getElementById("block-options-size-width").value);
  const nheight = parseInt(document.getElementById("block-options-size-height").value);

  setCanvSizeContex2D(nwidth,nheight);
  setCanvSizeStyle(nwidth,nheight);
  setCanvTopLeft(cavnDefX,cavnDefY);
  canvWidth = nwidth;
  canvHeight = nheight;

  currentNumberScales = CONST_DEF_Sacle;

  drawFillBackground();

  // DrawMesh();
}





function openFile(){
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _this => 
  {
    let files = Array.from(input.files);
    if(files.length <=0) return;
    if(!files[0].type.includes("image/")) return;
    var base_image = new Image();
    base_image.src = URL.createObjectURL(files[0]);
    base_image.onload = l =>{
      
      if(base_image.width <1 || base_image.height <1) return;
      
      setCanvSizeStyle(base_image.width,base_image.height);
      setCanvTopLeft(cavnDefX,cavnDefY);
      setCanvSizeContex2D(base_image.width,base_image.height);
      canvWidth = base_image.width;
      canvHeight = base_image.height;
      currentNumberScales = CONST_DEF_Sacle;
      drawFillBackground();
      ctx.drawImage(base_image, 0, 0);
    }
  };
  input.click();
}

function saveFile(){
  let imgAsDataURL = canv.toDataURL("image/png", 1.0);
  var link = document.createElement("a");
  link.setAttribute("href", imgAsDataURL);
  link.setAttribute("download", "111.png");
  link.click();
}



function eventChangeSelectLang(){
  const nLang = selectLang.value;
  changeLanguage(nLang);
}

function changeLanguage(newLang){  
  for(let key in langListTrans){
    let elem = document.querySelector(".lng-" + key);
    if(elem){
      elem.innerHTML=langListTrans[key][newLang];
    }
  }
  location.href = window.location.pathname + "#" + newLang;
}


let hash = window.location.hash;
if(hash.length>1) {hash = hash.substring(1); }
else if (hash.length <=1) {hash = listLang[0];}
if(listLang.includes(hash)){
  changeLanguage(hash);
  selectLang.value = hash;
}




// const www = 800;
// const hhh = 800;
// setCanvSizeStyle(www,hhh);
// setCanvTopLeft(cavnDefX,cavnDefY);
// setCanvSizeContex2D(www,hhh);
// canvWidth = www;
// canvHeight = hhh;
// currentNumberScales = CONST_DEF_Sacle;
// drawFillBackground();
// RandDraw();

function RandDraw(){
  for(let p = 0;p < 800;p++){
    drawLine(Math.round(Math.random()*www)-500,Math.round(Math.random()*hhh)-500,
    Math.round(Math.random()*www)-500,Math.round(Math.random()*hhh)-500,
    getRandColor(),Math.round(Math.random()*5)+10);
  }
}