const CONST_colorsList = [
    "rgb(0,0,0)","rgb(128,128,128)","rgb(139,0,21)","rgb(255,0,0)","rgb(255,127,39)","rgb(255,255,0)","rgb(34,177,76)","rgb(0,162,232)","rgb(63,72,204)","rgb(163,73,164)",
    "rgb(255,255,255)","rgb(195,195,195)","rgb(185,122,87)","rgb(255,174,201)","rgb(255,201,14)","rgb(239,228,176)","rgb(181,230,29)","rgb(153,217,234)","rgb(112,146,190)","rgb(200,191,231)"
];

for(let p =0;p< 10;p++){
    CONST_colorsList.push(getRandColor());
}

function getRandColor(){
    const r =  Math.round(Math.random()*255);
    const g =  Math.round(Math.random()*255);
    const b =  Math.round(Math.random()*255);
    return `rgb(${r},${g},${b})`;
   
}