import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Image,
  Button
} from 'react-native';

type Props = {};
export default class Login extends Component<Props> {
  username = '';  //保存用户名
  password = '';  //保存密码

  /**
   * 当用户名输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的用户名]
   */
  onUsernameChanged = (newUsername) => {
      console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
      this.username = newUsername;
  };

  /**
   * 当密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的密码]
   */
  onPasswordChanged = (newPassword) => {
      console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
      this.password = newPassword;
  };

  /**
   * 点击空白处使输入框失去焦点
   */
  blurTextInput = () => {
      this.refs.username.blur();
      this.refs.password.blur();
  }

  /**
   * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
   */
  login = () => {
        const { navigation } = this.props;  //获取navigation的navigate方法
        
        let formData = new FormData();
        formData.append("username",this.username);
        formData.append("password",this.password);
        fetch('http://103.6.254.175:8000/api-token-auth', {
            method: 'POST',
            headers: {},
            body: formData,
            }).then(function(response){
                response.json().then(function(data){
                    // 存储用户token
                    let Global = require('./Global');
                    Global.userToken = 'Token'+' '+ data.token;
                    if(data.token) {
                        navigation.navigate('HomePage');  //跳转到注册过的Home界面
                    } else {
                        Alert.alert("Login failed","Incorrect email or password");  //弹出提示框
                    }
                })
            })
            .catch((error) =>{
            console.error(error);
            });
  };

  /**
   * 注册按钮，点击进入注册界面
   */
  register = () => {
      const { navigation } = this.props;  //获取navigation的navigate方法
      navigation.navigate('Register');  //跳转到注册过的Register界面
  }

  render() {
    return (
      <TouchableOpacity  //用可点击的组件作为背景
        activeOpacity={1.0}  //设置背景被点击时的透明度改变值
        onPress={this.blurTextInput}  //添加点击事件
        style={styles.container}>
        <View>
          <Image source={require('../imgs/logo.png')} style={styles.logo}/>
        </View>
        <View
            style={styles.inputBox}>
            <TextInput
                ref="username"  //设置描述
                onChangeText={this.onUsernameChanged}  //添加值改变事件
                style={styles.input}
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'#ccc'}  //设置占位符颜色
                placeholder={'usename'}  //设置占位符
            />
        </View>
        <View
            style={styles.inputBox}>
            <TextInput
                ref="password"  //设置描述
                onChangeText={this.onPasswordChanged}  //添加值改变事件
                style={styles.input}
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                secureTextEntry={true}  //设置为密码输入框
                placeholderTextColor={'#ccc'}  //设置占位符颜色
                placeholder={'password'}  //设置占位符
            />
        </View>
        <TouchableOpacity
            onPress={this.login} //添加点击事件
            style={styles.loginButton}>
            <Text
                style={styles.lbtText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.register}>
          <Text style={styles.rtext}>New? Create an account</Text>
          <TouchableOpacity
              onPress={this.register}  //添加点击事件
              style={styles.registerButton}>
              <Text
                  style={styles.rbtText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  input: {
      width: 200,
      height: 40,
      fontSize: 15,
      color: 'black',
  },
  inputBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 280,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#58812F',
      backgroundColor: '#fff',
      marginBottom: 8,
  },
  loginButton: {
      height: 40,
      width: 280,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#58812F',
      marginTop: 20,
  },
  register: {
      flexDirection:'row',
      marginTop: 20,
  },
  registerButton: {
    width: 80,
    borderRadius: 8,
  },
  rtext: {
    width: 200,
    paddingLeft: 20,
  },
  lbtText: {
      color: '#fff',
      fontSize: 20,
  },
  rbtText: {
      color: '#58812F',
      fontSize: 14,
  },
  logo: {
      width: 200,
      height: 100,
      borderWidth: 1,
      borderColor: '#58812F',
      marginTop: 100,
      marginBottom: 50,
  }
});
