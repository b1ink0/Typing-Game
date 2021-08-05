const song = new Audio("./media/song_1.mp3");
const input = document.querySelector(".con textarea");
const btn1 = document.querySelector(".con button");
let condition = false;
let num = 1000;
let time = 0;
let timeStart = false;
let timestart2 = false;
let timestart3 = false;
let cpm = 0;
let wpm = 0;
let temp = 0;

input.addEventListener("input", (e) => {
  condition = true;
  timeStart = true;
  timestart();
  setinterval();
  if (condition) {
    song.play();
  }
});
let myinterval2;
const handlepause = () => {
  console.log(temp, input.value.length);
  if (temp == input.value.length) {
    // console.log(song.currentTime)
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
          document.getElementById('meter').innerText = `Time: ${time} CPM: ${cpm} WPM: ${wpm}`
        }
        if (time == 60) {
          clearInterval(meterInterval)
          clearInterval(myinterval);
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
