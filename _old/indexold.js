





// let mouseCordOnPage={
//   x: 0,
//   y: 0
// };

//setInterval(()=>{ console.log(`cords: ${mouseCordOnPage.x}, ${mouseCordOnPage.y}`);},300);

// document.onmousemove = function(e){
//   if (!e) e = window.event;
//   if (e.pageX){
//     mouseCordOnPage.x = e.pageX;
//   }
//   if (e.pageY){
//     mouseCordOnPage.y = e.pageY;
//   }
// }







// draw();
// function draw() {
//   for(var i=0;i<4;i++){
//     for(var j=0;j<3;j++){
//       ctx.beginPath();
//       var x = 25+j*50; // x coordinate
//       var y = 25+i*50; // y coordinate
//       var radius = 20; // Arc radius
//       var startAngle = 0; // Starting point on circle
//       var endAngle = Math.PI+(Math.PI*j)/2; // End point on circle
//       var anticlockwise = i%2==0 ? false : true; // clockwise or anticlockwise

//       ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

//       if (i>1){
//         ctx.fill();
//       } else {
//         ctx.stroke();
//       }
//     }
//   }  
// }


















// var canvas = document.getElementById('canvas');
// if (canvas.getContext)
// {
//   var ctx = canvas.getContext('2d');
//   ctx.beginPath();
//   ctx.moveTo(75,50);
//   ctx.lineTo(100,75);
//   ctx.lineTo(100,25);
//   ctx.fill();
// }





// document.onmousemove = function(e)
// {
  
// 	if (!e) e = window.event;
//     if (e.pageX)
//     {
//         console.log("xp:" + e.pageX);
//     }
//     else if (e.clientX)
//     {
//         console.log("xc:" + e.clientX);
//        // return e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
//     }

//     if (e.pageY)
//     {
//         console.log("yp:" + e.pageY);
//     }
//     else if (e.clientY)
//     {
//         console.log("yc:" + e.clientY);
//        // return e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
//     }

// }




// создаем элемент
// var elem = document.createElement("p");
// // создаем для него текст
// var elemText = document.createTextNode("Привет мир");
// // добавляем текст в элемент в качестве дочернего элемента
// elem.appendChild(elemText);
// // добавляем элемент в блок div
// articleDiv.appendChild(elem);





















window.onresize = (ev)=>{
    console.dir(ev);
  }
  















  
// function openFile(){
//   let input = document.createElement('input');
//   input.type = 'file';
//   input.onchange = _this => {
//             let files =   Array.from(input.files);
//             console.log(files);

//             const now = new Date();

//             const date = new Date(files[0].lastModified);
//             const stale = now.getTime() - files[0].lastModified;
//             console.dir(date);
//         };
//   input.click();
// }