function loadExtenstion() {
  // Drag element
  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
      
      elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      var winW = document.documentElement.clientWidth || document.body.clientWidth,
        winH = document.documentElement.clientHeight || document.body.clientHeight;
      maxX = winW - elmnt.offsetWidth - 1,
        maxY = winH - elmnt.offsetHeight - 1;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      //console.log((elmnt.offsetLeft - pos1), maxY, (elmnt.offsetLeft - pos1), maxX);
      if ((elmnt.offsetTop - pos2) <= maxY && (elmnt.offsetTop - pos2) >= 0) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      }
      if ((elmnt.offsetLeft - pos1) <= maxX && (elmnt.offsetLeft - pos1) >= 0) {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  

  // Start Clock
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("clockDigits").innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }

  // Check time
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  let clockContainer = document.getElementById("clockContainer");
  let clockDigits = document.getElementById("clockDigits");
  let closeClock = document.getElementById("closeClock");

  if (clockContainer) clockContainer.parentNode.removeChild(clockContainer);
  if (clockDigits) clockDigits.parentNode.removeChild(clockDigits);
  if (closeClock) closeClock.parentNode.removeChild(closeClock);

  clockContainer = document.createElement("div");
  clockContainer.setAttribute("id", "clockContainer");

  clockDigits = document.createElement("div");
  clockDigits.setAttribute("id", "clockDigits");

  closeClock = document.createElement("span");
  closeClock.setAttribute("id", "closeClock");

  clockContainer.style.position = "fixed";
  clockContainer.style.display = "inline-block";
  clockContainer.style.backgroundColor = "transparent";
  clockContainer.style.top = "50%";
  clockContainer.style.left = "50%";
  clockContainer.style.zIndex = "100000000";
  clockContainer.style.cursor = "move";

  clockDigits.style.fontSize = "24px";
  clockDigits.style.background = "linear-gradient(0deg, red, transparent)";
  clockDigits.style.color = "linen";
  clockDigits.style.padding = "5px 10px";
  clockDigits.style.width = "120px";
  clockDigits.style.textAlign = "center";
  clockDigits.style.borderRadius = "25px";

  closeClock.innerText = "X";
  closeClock.style.position = "absolute";
  closeClock.style.fontSize = "12px";
  closeClock.style.color = "red";
  closeClock.style.cursor = "pointer";
  closeClock.style.top = "-5px";
  closeClock.style.right = "3px";
  closeClock.onclick = function (e) {
    clockContainer.parentNode.removeChild(clockContainer);
  };

  clockContainer.appendChild(clockDigits);
  clockContainer.appendChild(closeClock);
  document.body.appendChild(clockContainer);

  startTime();
  dragElement(clockContainer);
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes("chrome://")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: loadExtenstion,
    });
  }
});
