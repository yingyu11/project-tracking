import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import { createBottomTabNavigator } from "react-navigation";
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome'
import ImagePicker from 'react-native-image-picker';
 
class Home extends React.Component {
  state = {
    videoSource: null
  };

  //拍摄视频
  takeVideo() {
    const options = {
        title: 'Take a video',
        cancelButtonTitle: 'cancel',
        mediaType: 'video',
        videoQuality: 'medium'
    };

    ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled video picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
          this.setState({
              videoSource: response.uri
          });

          const uploadMediaData = new FormData();
          uploadMediaData.append('file', {
            uri:  response.uri,
            type: 'multipart/form-data',
            name: response.fileName,
          });
          
          let Global = require('./Global');
          
          fetch('http://103.6.254.175:8000/media/upload', {
            method: 'POST',
            headers: {
              Authorization:Global.userToken
            },
            body: uploadMediaData,
          }).then(function(response){
              if(response.status == 204) {
                Alert.alert("Upload successful","You can see the result in History, it may take a few minutes to process");
              } else {
                Alert.alert("Upload unsuccessful",response.json);
              };
          })
          .catch((error) =>{
            console.error(error);
          });
        }
    });
  }

  //选择视频
  selectVideo() {
    const options = {
        title: 'Select a video',
        type: 'library',
        cancelButtonTitle: 'cancel',
        mediaType: 'video',
        videoQuality: 'high'
    };

    ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled video picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            this.setState({
                videoSource: response.uri
            });

            const uploadMediaData = new FormData();
            uploadMediaData.append('file', {
              uri:  response.uri,
              type: 'multipart/form-data',
              name: response.fileName,
            });
            
            let Global = require('./Global');
            
            fetch('http://103.6.254.175:8000/media/upload', {
              method: 'POST',
              headers: {
                Authorization:Global.userToken
              },
              body: uploadMediaData,
            }).then(function(response){
                if(response.status == 204) {
                  Alert.alert("Upload successful","You can see the result in History, it may take a few minutes to process");
                } else {
                  Alert.alert("Upload unsuccessful",response.json);
                };
            })
            .catch((error) =>{
            console.error(error);
            });
        }
    });
  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.tText}>LET'S BEGIN...</Text>
        <Text style={styles.desText}>Detect moving objects in the video</Text>
        <Text style={styles.desText}>You can see the test result in History</Text>
        <Text style={styles.desText}>It might take a few minutes</Text>
        
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this.takeVideo.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
                <Text>Take a video</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideo.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
                <Text>Select a video</Text>
            </View>
        </TouchableOpacity>

        {/* { this.state.videoSource &&
        <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        } */}
        </View>
      </View>
    );
  }
}
 
class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videoList: [] };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      let Global = require('./Global');
        fetch('http://103.6.254.175:8000/users/self/media/recent', {
          method: 'GET',
          headers: {
            Authorization:Global.userToken
          }
        })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({ videoList: responseData});
        })
        .catch((error) =>{
        console.error(error);
        });
    }, 7000);
  }

  componentDidMount() {
    let Global = require('./Global');
    fetch('http://103.6.254.175:8000/users/self/media/recent', {
      method: 'GET',
      headers: {
        Authorization:Global.userToken
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ videoList: responseData});
    })
    .catch((error) =>{
    console.error(error);
    });
  }

  render() {
    let testDate = true;
    return (
      <View style={styles.historyContainer}>
        {this.state.videoList.length > 0 ? 
          <ShowVideos data={this.state.videoList} {...this.props}></ShowVideos>
        : 
          <NoneVideo></NoneVideo>
        }
      </View>
    );
  }
}

class ShowVideos extends React.Component {
  state = {
    rotateVal: new Animated.Value(0), 
  }

  componentDidMount(){ // 组件加载完成后启动动画
    const animationLoading = Animated.timing(
        this.state.rotateVal, // 初始值
        {
            toValue: 360, // 终点值
            easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
        }
    );
    Animated.loop(animationLoading).start(); // 开始动画
    // setTimeout(Animated.loop(animationLoading).stop, 5000); // 5秒后停止动画，可用于任意时刻停止动画
  }

  playVideo(item,index) {
    const url = 'http://103.6.254.175:8080'+item.image.standard_resolution;
    const { navigation } = this.props;  //获取navigation的navigate方法
    navigation.navigate('VideoPage', {url});  //跳转到注册过的VideoPages界面

    // const url = 'http://127.0.0.1:8000'+item.image.standard_resolution;
    
    // RNFetchBlob
    //   .config({
    //     // add this option that makes response data to be stored as a file,
    //     // this is much more performant.
    //     fileCache : true,
    //     appendExt : 'mp4'
    //   })
    //   .fetch('GET', url, {
    //     //some headers ..
    //   })
    //   .then((res) => {
    //     // the temp file path
    //     Alert.alert('The file saved to ', res.path())
    //     const { navigation } = this.props;  //获取navigation的navigate方法
    //     const localUrl = res.path();
    //     navigation.navigate('VideoPage', {url});  //跳转到注册过的VideoPages界面
    //   })
    
    // let url = 'http://127.0.0.1:8080'+item.image.standard_resolution;
    // Linking.openURL(url) 
    
  }
  showResult(item,index) {
    const result = item
    const { navigation } = this.props;  //获取navigation的navigate方法
    navigation.navigate('ResultPage', {result});  //跳转到注册过的VideoPages界面 
  }

  renderVideo = ({ item,index }) => {
    videoListLen = this.props.data.length;
    if(item.finished){
      return (
        <View style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Text style={{flex: 1}}>video{videoListLen-index}</Text>
            <Text style={{flex: 1, color: '#58812F'}} onPress={this.showResult.bind(this, item, index)}>objects</Text>          
            <TouchableOpacity onPress={this.playVideo.bind(this, item, index)}>
              <Text style={{flex: 1, color: '#58812F'}}>play the video</Text> 
            </TouchableOpacity> 
          </View>
          
        </View>
      );
    } else{
        return (
          <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start',}}>
              <Text style={{flex: 1}}>video{videoListLen-index}</Text>
              <Text style={{flex: 1}}>processing</Text>
               <Animated.Text 
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        fontWeight:'bold',
                        transform: [{ // 动画属性
                            rotate: this.state.rotateVal.interpolate({
                                inputRange: [0, 360],
                                outputRange: ['0deg', '360deg'],
                            })
                        }]
                    }}>
                    <Iconicons
                      name = {'ios-refresh'}
                      size = {14}
                    />
                </Animated.Text>
            </View> 
          </View>
        );
      }
  }

  _header = function () {
    return (
        <View>
        <Text style={{marginTop: 20, marginBottom: 7, fontSize: 18,}}>History</Text>
        <Text style={{marginBottom: 7,}}>See your recent upload records</Text>
        <Text style={{marginBottom: 7,}}>The new video takes time to process</Text>
        <Text style={{marginBottom: 20,}}>This may take a few minutes</Text>
        </View>
    );
  }

  //此函数用于为给定的item生成一个不重复的key
  //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
   _keyExtractor = (item, index) => index;

  render() {
    let videoList = this.props.data
    return (
      <FlatList
        data={videoList}
        ListHeaderComponent={this._header}
        renderItem={this.renderVideo}
        keyExtractor={this._keyExtractor}
        style={styles.showVideos}
      />
    );
  }
}

class NoneVideo extends React.Component {
  render() {
    return (
      <View style={styles.noneVideo}>
        <Text style={styles.mb10}>History is empty</Text>
        <Text>Upload your first video</Text>
      </View>
    );
  }
}
 
class Account extends React.Component {
  render() {
    return (
      <View style={styles.accountContainer}>
          <Image source={require('../imgs/background.png')} style={styles.bg}/>
          <Image source={require('../imgs/picture.jpg')} style={styles.picture}/>
          <Text style={styles.hello}>Hello!</Text>
          <View style={styles.viewCommon}>
            <Text style={styles.txtCommon}>Profile</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.txtCommon}>Message</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.txtCommon}>Settings</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
          <View style={styles.viewCommon}>
            <Text style={styles.txtCommon}>Help</Text>
            <Icon style={styles.iconCommon} name='angle-right' size={20}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
      flex: 1,
      // alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  tText: {
      marginLeft: 40,
      marginTop: 70,
      marginBottom: 10,
      fontSize: 18,
  },
  desText: {
      marginLeft: 40,
      marginBottom: 7,
  },
  buttonContainer: {
      alignItems: 'center',
      marginTop: 20,
  },
  avatarContainer: {
      borderColor: '#58812F',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  avatar: {
      borderRadius: 75,
      width: 150,
      height: 150,
      marginBottom: 10,
      backgroundColor: '#fff'
  },
  accountContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  bg: {
      height: 250
  },
  picture: {
      height: 90,
      width: 90,
      borderRadius: 45,
      position: 'absolute',
      top:90,
      marginLeft: "auto",
      marginRight:"auto",
      marginBottom: 2,
  },
  hello: {
      position: 'absolute',
      top:190,
      marginLeft: "auto",
      marginRight:"auto",
      color: '#fff',
      fontSize: 16,
  },
  txtCommon: {
      marginLeft: 30,
      flex: 1
  },
  iconCommon: {
      marginRight: 10
  },
  viewCommon: {
      height: 50,
      marginTop: 2,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff'
  },
  historyContainer: {
      flex: 1,
      // alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  showVideos: {
      marginLeft: 40,
      marginRight: 40,
      backgroundColor: '#F5FCFF',
  },
  noneVideo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  mb10: {
      marginBottom: 10,
  },
  hisText: {
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
});
 
const HomePage = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon:({tintColor,focused}) => (
          <Iconicons
            name = {'ios-home'}
            size = {26}
            style = {{color: tintColor}}
          />
        )
      }
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon:({tintColor,focused}) => (
          <Iconicons
            name = {'ios-images'}
            size = {26}
            style = {{color: tintColor}}
          />
        )
      }
    },
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarLabel: 'Info',
        tabBarIcon:({tintColor,focused}) => (
          <Iconicons
            name = {'ios-person'}
            size = {26}
            style = {{color: tintColor}}
          />
        )
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#58812F',
      inactiveTintColor: '#000',
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#823453',
      pressOpacity: 0.8,
      style: {
        paddingTop: 8,
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
      },
      labelStyle: {
        fontSize: 12,
        margin: 1
      },
      indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
  });
 
module.exports = HomePage;