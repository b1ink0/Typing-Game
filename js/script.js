const song = new Audio("./media/song_1.mp3");
const input = document.querySelector(".con input");
const btn1 = document.querySelector(".pauseBtn");
const btn2 = document.querySelector(".resetBtn");
const preTextOutput = document.querySelector(".preTextOutput");
const textTempDiv = document.querySelector(".textTemp");
const textCon_1 = document.querySelector(".textCon_1");
const wpmMeterHand = document.querySelector(".wpmMeterHand");
const wpmMainMeter = document.querySelector(".wpmMainMeter");

let condition = false;
let num = 1000;
let time = 0;
let timeStart = false;
let timestart2 = false;
let timestart3 = false;
let cpm = 0;
let wpm = 0;
let temp = 0;
let text =
  "Space exploration is the use of astronomy and space technology to explore outer space. While the exploration of space is carried out mainly by astronomers with telescopes, its physical exploration though is conducted both by unmanned robotic space probes and human spaceflight. Space exploration, like its classical form astronomy, is one of the main sources for space science.";
let textOut = "";
let textIndex = 0;
let textTemp = "";
let textArrIndex_1 = 0;
let textArrIndex_2 = 5;
let textArrLength = 0;
let textIndexColor = 0;
let textIndexColorSub = 1;
let inputFocus = false;

let textArr = text.split(" ");
let textArrTemp = textArr.slice(textArrIndex_1, textArrIndex_2);
textTemp = textArrTemp.join("_") + "_";
textTempDiv.innerHTML =
  textTemp.slice(0, 0) +
  `<span class="span_1">${textTemp[0]}</span>` +
  `<span class="span_2">${textTemp.slice(1)}</span>`;
preTextOutput.innerHTML = `<div class="downText text-3xl text-white absolute">${
  textArr.slice(textArrIndex_1 + 5, textArrIndex_2 + 5).join("_") + "_"
}</div>`;
textArrLength = textTemp.length;
textIndexColor = textTemp.length;

const handleColorDiv = () => {
  return (
    textTemp.slice(0, textIndexColorSub) +
    `<span class="span_1">${textTemp[textIndexColorSub]}</span>` +
    `<span class="span_2">${textTemp.slice(textIndexColorSub + 1)}</span>`
  );
};
const handleRedColorDiv = () => {
  return (
    textTemp.slice(0, textIndexColorSub - 1) +
    `<span class="span_3">${textTemp[textIndexColorSub - 1]}</span>` +
    `<span class="span_2">${textTemp.slice(textIndexColorSub)}</span>`
  );
};

const handleText = () => {
  if (textArrLength - 1 == textIndexColorSub) {
    console.log(textIndexColorSub, textArrLength);
    textTempDiv.innerHTML =
      textTemp.slice(0, textIndexColorSub) +
      `<span>${textTemp[textIndexColorSub]}</span>` +
      textTemp.slice(textIndexColorSub + 1);
  } else if (textArrLength == textIndexColorSub) {
    textIndexColorSub = 0;
  }
  if (textArrLength == input.value.length) {
    textCon_1.innerHTML = `<div class="up_1 text-3xl text-white">${
      textArr.slice(textArrIndex_1, textArrIndex_2).join("_") + "_"
    }</div>`;
    if (document.querySelector(".downText")) {
      document.querySelector(".downText").classList.add("up_2");
    }
    textArrIndex_1 = textArrIndex_1 + 5;
    textArrIndex_2 = textArrIndex_2 + 5;
    textArrTemp = textArr.slice(textArrIndex_1, textArrIndex_2);
    textTemp = textArrTemp.join("_") + "_";
    textTempDiv.innerHTML = handleColorDiv();
    textArrLength = textArrLength + textTemp.length;
    textIndexColor = textTemp.length;
    textIndexColorSub = 0;
    setTimeout(() => {
      preTextOutput.innerHTML = `<div class="downText text-3xl text-white absolute">${
        textArr.slice(textArrIndex_1 + 5, textArrIndex_2 + 5).join("_") + "_"
      }</div>`;
    }, 300);
  }
};

const handleTextColor = () => {
  if (textIndexColorSub < textIndexColor) {
    textTempDiv.innerHTML = handleColorDiv();
    textIndexColorSub++;
  } else if (textIndexColorSub == textIndexColor) {
    textIndexColorSub = 0;
  }
};
const handleTextColorRed = () => {
  textTempDiv.innerHTML = handleRedColorDiv();
};

input.addEventListener("input", (e) => {
  condition = true;
  timeStart = true;
  timestart();
  setinterval();
  handleText();
  handleInputCheck();
  if (condition) {
    song.play();
  }
});

let myinterval2;
const handlepause = () => {
  if (temp == input.value.length) {
    var fadeSong = setInterval(() => {
      if (Math.round(song.volume * 10) != 0) {
        var vol = Math.round(song.volume * 10);
        vol = vol - 1;
        song.volume = vol / 10;
        if (vol == 0) {
          song.pause();
        }
      }
      if (Math.round(song.volume * 10) == 0) {
        clearInterval(fadeSong);
      }
    }, 100);
  } else {
    song.play();
    var fadeInSong = setInterval(() => {
      if (Math.round(song.volume * 10) != 10) {
        var vol = Math.round(song.volume * 10);
        vol = vol + 1;
        song.volume = vol / 10;
      }
      if (Math.round(song.volume * 10) == 10) {
        clearInterval(fadeInSong);
      }
    }, 100);
  }
  setTimeout(() => {
    temp = input.value.length;
  }, 1500);
};
var myinterval;
const setinterval = () => {
  if (!timestart3) {
    myinterval = setInterval(handlepause, 1000);
    timestart3 = true;
  }
};
const timestart = () => {
  if (!timestart2) {
    if (timeStart) {
      var meterInterval = setInterval(() => {
        if (time < 60) {
          time = time + 1;
          cpm = Math.round((input.value.length / time) * 60);
          wpm = Math.round((input.value.length / 5 / time) * 60);
          wpmMainMeter.innerHTML = `<span>${wpm}</span>`;
          wpmMeterHand.style.transform = `translate(77px, 95px) rotate(${
            wpm * 1.5 - 90
          }deg)`;
          console.log(wpmMeterHand);
        }
        if (time == 60) {
          clearInterval(meterInterval);
          clearInterval(myinterval);
          input.disabled = true;
          var fadeSong = setInterval(() => {
            if (Math.round(song.volume * 10) != 0) {
              var vol = Math.round(song.volume * 10);
              vol = vol - 1;
              song.volume = vol / 10;
              if (vol == 0) {
                song.pause();
              }
            }
            if (Math.round(song.volume * 10) == 0) {
              clearInterval(fadeSong);
            }
          }, 100);
        }
      }, 1000);
      timestart2 = true;
    }
  }
};

btn1.addEventListener("click", () => {
  song.pause();
  clearInterval(myinterval);
});

handleStringToArray = (text, textArr) => {
  for (let i = 0; i < text.length; i++) {
    textArr.push(text[i]);
  }
};

const handleInputCheck = () => {
  if (input.value[textIndex] == text[textIndex]) {
    textOut = textOut + text[textIndex];
    input.value = textOut;
    textIndex++;
    handleTextColor();
  } else if (input.value[textIndex] != text[textIndex]) {
    input.value = textOut;
    handleTextColorRed();
  }
};
const preventBackspace = (event) => {
  if (event.keyCode == 8) {
    event.preventDefault();
  }
};

btn2.addEventListener("click", () => {
  location.reload();
});
input.focus();
document.addEventListener("click", () => {
  if (document.activeElement.tagName == "INPUT") {
    console.log("input active");
    inputFocus = true;
  } else {
    console.log("input inactive");
    inputFocus = false;
  }
});
