import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import {FullscreenClose, FullscreenOpen} from '../assets/icons';
import {PlayerControls, ProgressBar} from '../components';
import RNFetchBlob from 'rn-fetch-blob'
import RNFS from 'react-native-fs';

interface State {
  fullscreen: boolean;
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

export const VideoPlayer: React.FC = () => {
  const videoRef = React.createRef<Video>();
  const [state, setState] = useState<State>({
    fullscreen: false,
    play: true,
    currentTime: 0,
    duration: 0,
    showControls: true,
    progressPer:0,

  });
  const [downloadedPlay,setDownloadedPlay]=useState(false)
  const [time,setTime]=useState(0)
 const [videoPath,setPath]=useState('https://multiplatform-f.akamaihd.net/i/multi/april11/cctv/cctv_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8')
  const getFileContent = async (path) => {
    console.log(await RNFS.exists(RNFS.ExternalDirectoryPath+'/Testing_Video_1.mp4'))
    // RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DCIMDir)
    // // files will an array contains filenames
    // .then((files) => {
    //     console.log(files)
    // })
  };
  
const path=RNFS.ExternalDirectoryPath+'/file1.pm4'
  const downloadFile=()=> {
    RNFS.downloadFile({
      fromUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      toFile:path,
      //headers
      background: true,// Continue the download in the background after the app terminates (iOS only)**
      discretionary: true, 
      cacheable: true,
   
      begin: (res: DownloadBeginCallbackResult) => {
        console.log("Response begin ===\n\n");
        console.log(res);
      },
      progress: (res: DownloadProgressCallbackResult) => {
       //here you can calculate your progress for file download
  
        console.log("Response written ===\n\n");
        let progressPercent = (res.bytesWritten / res.contentLength)*100; // to calculate in percentage
        console.log("\n\nprogress===",progressPercent)
        setState(s=>{
          return {...s,progressPer:(res.bytesWritten / res.contentLength)*100}
        })
        console.log(res);
      }
    })
      .promise.then(res => {
        console.log("res for saving file===", path);
        setPath(path)
        // setDownloadedPlay(true)
        // setTimeout(()=>{
        //   setDownloadedPlay(false)
        // },1000)
        // return RNFS.readFile(downloadfilePath, "base64");
  })
  return
    console.log('Called....')
    let dirs = RNFS.ExternalDirectoryPath//RNFetchBlob.fs.dirs;
    const filePath = `${dirs}`;
    var filename = 'Testing_Video_1.mp4';
    RNFetchBlob.config({
        path:`${dirs}/${filename}`,
        fileCache:true,
        addAndroidDownloads: {
            notification : false,
            useDownloadManager :false,
            description: 'TaxiJo Payment Invoice',
            mime:'video/mp4',
            mediaScannable:true,
            path:`${dirs}/${filename}`
        },
    })
    .fetch('GET','http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',{
        'Cache-Control' : 'no-store'
    })
    .progress({ interval: 0},(received,total)=>{
        console.log('progress',received/total);
       
    })
    .then(res=>{
      console.log(`File path of download ${dirs}/${filename}`,res.path())
        // RNFetchBlob.fs.stat(res.path()).then(stats=>{
        //     console.log(stats);
        // }).catch(err=>{
        //     console.log('error while getting mimetypes');
        // })
     
        // RNFetchBlob.fs.exists(res.path()).then(exist=>{
        //     console.log(`file ${exist ? '' : 'not'} exists`)
        // }).catch(
        //     err=>console.log('error while checking existance',err)
        // );
  
    })
    .catch((errorMessage,statusCode)=>{
        console.log("error with downloading file",errorMessage)
    })
  }
  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);
  // console.log()
  getFileContent(RNFS.ExternalDirectoryPath)
    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  return (
    <View style={styles.container}>
     
      <TouchableWithoutFeedback onPress={showControls}>
      {!downloadedPlay?  <View >
          <Video
          // style={styles.video}
          source={{uri:videoPath,     
       }}
          rate={1.0}                              
          // controls={true  }                        
          // muted={false}                           
          // paused={false}                          
          // resizeMode="contain"                      
          // repeat={true}                           
          // playInBackground={false}                
          // playWhenInactive={false}                
          // progressUpdateInterval={250.0}
          // onLoad={()=>this.setState({ onBuffer : false })}
          // onError={()=>this.setState({ onBuffer : true })}
            ref={videoRef}
            // source={{
            //   uri:
            //     'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8',
            // }}
          
            style={state.fullscreen ? styles.fullscreenVideo : styles.video}
            controls={false}
            resizeMode={'contain'}
            onLoad={onLoadEnd}
            hls={true}
            // onProgress={onProgress}
            onProgress={(data)=>setTime(data.currentTime)}
            onEnd={onEnd}
            paused={!state.play}
          />
         
          {state.showControls?  <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                style={[styles.fullscreenButton,{backgroundColor:'rgba(255,255,255,0.5)'}]}>
                {state.fullscreen ? <Text>Full Close</Text>: <Text>Full Open</Text>}
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip={true}
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={time}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
            </View>:null}
   
        </View>:<View/>}
      </TouchableWithoutFeedback>
      <View>
      <Text  style={styles.text} onPress={async ()=>{
        downloadFile()
     
      }}>Download</Text>
      {state.progressPer?
       <Text  style={styles.text}>Downloaded {Math.round(state.progressPer).toFixed(2)} %</Text>:null
      }
      </View>
      <ScrollView>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus enim
          suscipit ipsa impedit laboriosam saepe, sapiente excepturi molestiae
          laudantium, non tempora cumque, quam assumenda deserunt? Similique
          eaque voluptas itaque corporis. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sequi unde iusto vel facere quibusdam nisi placeat,
          debitis veritatis autem deserunt at voluptas nam ut mollitia qui fugit
          minus minima quod.
        </Text>
      </ScrollView>
    </View>
  );

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState(s => ({...s, fullscreen: true})), StatusBar.setHidden(true))
      : (setState(s => ({...s, fullscreen: false})),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({...state, play: false, showControls: true});
      return;
    }

    setState({...state, play: true});
    setTimeout(() => setState(s => ({...s, showControls: false})), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({...state, currentTime: state.currentTime - 15});
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({...state, currentTime: state.currentTime + 15});
  }

  function onSeek(data: OnSeekData) {
    videoRef.current.seek(data.seekTime);
    setState({...state, currentTime: data.seekTime});
  }

  function onLoadEnd(data: OnLoadData) {
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
  }

  function onProgress(data: OnProgressData) {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({...state, play: false});
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({...state, showControls: false})
      : setState({...state, showControls: true});
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
