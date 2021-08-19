const song = new Audio("./media/song_1.mp3");
const input = document.querySelector(".con input");
const btn1 = document.querySelector(".pauseBtn");
const btn2 = document.querySelector(".resetBtn");
const textOutput = document.querySelector(".textOutput");
const textTempDiv = document.querySelector(".textTemp");

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

let textArr = text.split(" ");
let textArrTemp = textArr.slice(textArrIndex_1, textArrIndex_2);
textTemp = textArrTemp.join("_") + "_";
textTempDiv.innerHTML =
  textTemp.slice(0, 0) + `<span>${textTemp[0]}</span>` + textTemp.slice(1);
textArrLength = textTemp.length;
textIndexColor = textTemp.length;

const handleColorDiv = () => {
  return (
    textTemp.slice(0, textIndexColorSub) +
    `<span>${textTemp[textIndexColorSub]}</span>` +
    textTemp.slice(textIndexColorSub + 1)
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
    textArrIndex_1 = textArrIndex_1 + 5;
    textArrIndex_2 = textArrIndex_2 + 5;
    textArrTemp = textArr.slice(textArrIndex_1, textArrIndex_2);
    textTemp = textArrTemp.join("_") + "_";
    textTempDiv.innerHTML = handleColorDiv();
    textArrLength = textArrLength + textTemp.length;
    textIndexColor = textTemp.length;
    textIndexColorSub = 0;
  }
};

const handleTextColor = () => {
  if (textIndexColorSub < textIndexColor) {
    textTempDiv.innerHTML = handleColorDiv();
    textIndexColorSub++;
  } else if (textIndexColorSub == textIndexColor) {
    console.log("f");
    textIndexColorSub = 0;
  }
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
          document.getElementById(
            "meter"
          ).innerText = `Time: ${time} CPM: ${cpm} WPM: ${wpm}`;
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
    textOutput.innerText = textOut;
    input.value = textOut;
    textIndex++;
    handleTextColor();
  } else if (input.value[textIndex] != text[textIndex]) {
    input.value = textOut;
  }
};
const preventBackspace = (event) => {
  if (event.keyCode == 8) {
    event.preventDefault();
  }
};

btn2.addEventListener("click", () => {
  location.reload()
  });
input.focus();
