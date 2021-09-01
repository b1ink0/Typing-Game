const song = new Audio("./media/song_1.mp3");
const input = document.querySelector(".con input");
const preTextOutput = document.querySelector(".preTextOutput");
const textTempDiv = document.querySelector(".textTemp");
const textCon_1 = document.querySelector(".textCon_1");
const wpmMeterHand = document.querySelector(".wpmMeterHand");
const cpmMeterHand = document.querySelector(".cpmMeterHand");
const wpmMainMeter = document.querySelector(".wpmMainMeter");
const cpmMainMeter = document.querySelector(".cpmMainMeter");
const timeCon = document.querySelector(".time_Con");
const accuracyCon = document.querySelector(".accuracy_Con");
const barSpan = document.querySelector(".bar span");
const startTyping = document.querySelector(".startTyping");
const row_1 = document.querySelectorAll(".keyboard div button");

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
let mistakes = 0;
let keycode = 0;
let keyCorrect = false;
let inputFocusCon = true;
let keyAnimeCon = false;
let inputKey = "";

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
row_1.forEach((btn) => {
  btn.style.boxShadow =
    "inset 0px 0px 8px 2px var(--purple),0px 0px 8px 2px var(--purple)";
  if (btn.dataset.key == text[textIndex].toUpperCase()) {
    btn.style.boxShadow =
      "inset 0px 0px 8px 2px var(--green), 0px 0px 8px 2px var(--green)";
  }
});
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
        barSpan.style.width = `${vol * 10}%`;
        // console.table(vol)
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
        barSpan.style.width = `${vol * 10}%`;
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
          timeCon.innerHTML = `<span>${time}s</span>`;
          accuracyCon.innerHTML = `<span>${(
            ((text.length - mistakes) / text.length) *
            100
          ).toFixed(0)}%</span>`;
          wpmMainMeter.innerHTML = `<span>${wpm}</span>`;
          cpmMainMeter.innerHTML = `<span>${cpm}</span>`;
          wpmMeterHand.style.transform = `translate(77px, 95px) rotate(${
            wpm * 1.5 - 90
          }deg)`;
          cpmMeterHand.style.transform = `translate(77px, 95px) rotate(${
            cpm * 0.3 - 90
          }deg)`;
        }
        if (time == 60) {
          inputFocusCon = false;
          clearInterval(meterInterval);
          clearInterval(myinterval);
          input.disabled = true;
          startTyping.innerHTML = `<span class="flex flex-col justify-center items-center font-bold span_4 text-center text-3xl" style="text-shadow: 0 0 2px red, 0 0 10px #ff0000ff; color: #ff0000ff">TIME'S UP !</span>`;
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

handleStringToArray = (text, textArr) => {
  for (let i = 0; i < text.length; i++) {
    textArr.push(text[i]);
  }
};

const preventBackspace = (event) => {
  keycode = event.keyCode;
  if (event.keyCode == 8) {
    event.preventDefault();
  }
};

const handleInputCheck = () => {
  inputKey = input.value.slice(-1);
  keyCorrect = false;
  if (input.value[textIndex] == text[textIndex]) {
    textOut = textOut + text[textIndex];
    input.value = textOut;
    textIndex++;
    keyAnimeCon = true;
    handleTextColor();
    keyCorrect = true;
    handleNextKey();
    handleKeyAnime(inputKey, keyCorrect);
  } else if (input.value[textIndex] != text[textIndex]) {
    input.value = textOut;
    handleTextColorRed();
    mistakes++;
    keyCorrect = false;
    handleKeyAnime(inputKey, keyCorrect);
  }
};

const handleKeyAnime = (inputkey, keyCon) => {
  row_1.forEach((btn) => {
    if (btn.dataset.key == inputkey.toUpperCase()) {
      if (keyCon) {
        btn.style.animation = "scaleUpC 0.5s ease";
        btn.addEventListener("animationend", () => {
          btn.style.animation = "";
        });
      } else if (!keyCon) {
        btn.style.animation = "scaleUpW 0.5s ease";
        btn.addEventListener("animationend", () => {
          btn.style.animation = "";
        });
      }
    }
  });
};

const handleNextKey = () => {
  if (keyAnimeCon) {
    row_1.forEach((btn) => {
      btn.style.boxShadow =
        "inset 0px 0px 8px 2px var(--purple),0px 0px 8px 2px var(--purple)";
      if (btn.dataset.key == text[textIndex].toUpperCase()) {
        btn.style.boxShadow =
          "inset 0px 0px 8px 2px var(--green), 0px 0px 8px 2px var(--green)";
      }
    });
  }
};

input.focus();

const handleInputFocus = () => {
  if (document.activeElement.tagName == "INPUT") {
    console.log("input active");
    inputFocus = true;
    textTempDiv.style.border = "4px solid #ff000000";
    startTyping.innerHTML = `<span class="flex flex-col justify-center items-center font-bold span_4 text-center text-3xl">START TYPING !</span>`;
  } else {
    console.log("input inactive");
    inputFocus = false;
    textTempDiv.style.border = "4px solid #ff0000ff";
    startTyping.innerHTML = `<span class="flex flex-col justify-center items-center font-bold span_4 text-center text-3xl"      style="text-shadow: 0 0 2px red, 0 0 10px #ff0000ff; color: #ff0000ff">CLICK THE RED BOX !</span>`;
  }
};

handleInputFocus();

document.addEventListener("click", () => {
  if (inputFocusCon) {
    handleInputFocus();
  }
});

function isLowerCase(str) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}
