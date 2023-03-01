function saveFile(){
    // localStorage.clear();
    // let imgAsDataURL = canv.toDataURL("image/png");
    // try {
    //   localStorage.setItem("elephant", imgAsDataURL);
    //   console.log("Saved file");
    // }
    // catch (e) {
    //     console.log("Storage failed: " + e);
    // }
  
    let imgAsDataURL = canv.toDataURL("image/png");
    var link = document.createElement("a");
    // document.body.appendChild(link);
    link.setAttribute("href", imgAsDataURL);
    link.setAttribute("download", "111.png");
    link.click();
    
  }





















  
  let time = performance.now();

  time = performance.now() - time;
  console.log('Время выполнения = ', time);