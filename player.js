function JSFemto(filename, submit) {
  if (submit === true){
    document.getElementById('songSubmit').addEventListener('click', function() {
      var songName = document.getElementById('songName').value;
      console.log(songName);
      document.getElementById('source').setAttribute('src', songName);
      femtoPlayer.main();
    });
  } else {
    var songName = filename;
    var songNameElement = document.getElementById('songName').value;
    songNameElement.innerHTML = filename;
    console.log(songName);
    document.getElementById('source').setAttribute('src', songName);
    femtoPlayer.main();
  }

  // Set variable femtoPlayer to itself, if it already exists. Otherwise, set it to nothing.
  var femtoPlayer = femtoPlayer || {};

  femtoPlayer.main = function() {

    console.log('Welcome to JSFemto, the lightweight music player by ByteUp! Software, now ported to JavaScript!');

    //Sets main variables
    var player = document.getElementById('player'),
      songProgress = document.getElementById('songProgress'),
      name = document.getElementById('source').getAttribute('src'),
      playing = false,
      duration,
      mousedown;

    //Wait until audio is loaded, then get length of audio
    console.log('Loading audio...');
    player.addEventListener('loadedmetadata', function() {
      duration = this.duration;
      console.log('Song duration is:', duration);
    });

    //Displays name of audio
    console.log('JSFemto has loaded:', name);
    document.getElementById('name').innerHTML = name;


    //Moves range input with progress of audio
    player.addEventListener('timeupdate', function() {
      var currentTime = this.currentTime / duration;
      if (this.currentTime == duration){
        this.currentTime = 0;
        player.pause();
        console.log('Song finished. Gone back to start.');
        playing = false;
        document.getElementById('playPauseButton').innerHTML = 'Play';
      }
      if (!mousedown){
        songProgress.value = currentTime;
      }
    });

    //Listens for click on the Play / Pause button, plays / pauses
    document.getElementById('playPauseButton').addEventListener('click', function() {
      if (!playing) {
        player.play();
        console.log('Playing...');
        playing = true;
        document.getElementById('playPauseButton').innerHTML = 'Pause';
      }
      else {
        player.pause();
        console.log('Paused...');
        playing = false;
        document.getElementById('playPauseButton').innerHTML = 'Play';
      }

    });

    //Listens for click on the stop button, stops audio
    document.getElementById('stopButton').addEventListener('click', function() {
      console.log('Stop button clicked');
      player.pause();
      player.currentTime = 0;
      playing = false;
      document.getElementById('playPauseButton').innerHTML = 'Play';
    });


    //Waits for input on volume range, changes volume
    document.getElementById('volSlider').addEventListener('input', function() {
      console.log('Volume changed');
      player.volume = this.value;
    });

    //Listens for mouse up / down. Used to stop progress bar jumping when being dragged.
    songProgress.addEventListener('mousedown', function(){
      mousedown = true;
    });
    songProgress.addEventListener('mouseup', function(){
      mousedown = false;
    });

    //Listens for dragging of progress bar, puts audio at that position
    songProgress.addEventListener('change', function() {
      console.log('Song position changed');
      var position = this.value * duration;
      player.currentTime = position;
    });
  };
}
