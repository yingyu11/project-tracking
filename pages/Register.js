import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert
} from 'react-native';

type Props = {};
export default class Register extends Component<Props> {

  username = '';  //保存用户名
  password = '';  //保存密码
  confirmPassword = '';  //保存确认密码

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
   * 当确认密码输入框值改变时，保存改变的值
   * @param  {[type]} newUsername [输入的确认密码]
   */
  onConfirmPasswordChanged = (newConfirmPassword) => {
      console.log(newConfirmPassword);//运行后可以在输入框随意输入内容并且查看log验证！
      this.confirmPassword = newConfirmPassword;
  }

  /**
   * 点击空白处使输入框失去焦点
   */
  blurTextInput = () => {
      this.refs.username.blur();
      this.refs.password.blur();
      this.refs.confirmPassword.blur();
  }

  /**
   * 注册按钮，根据输入的内容判断注册是否成功
   */
  register = () => {
    const { goBack } = this.props.navigation;  //获取navigation的goBack方法

    if (this.username != '' && this.password != '') {
        if (this.username != 'Admin') {
            if (this.password === this.confirmPassword) {
                if(this.password.length > 5 ){
                    let formData = new FormData();
                    formData.append("username",this.username);
                    formData.append("password1",this.password);
                    formData.append("password2",this.confirmPassword);
                    fetch('http://103.6.254.175:8000/register', {
                        method: 'POST',
                        headers: {},
                        body: formData,
                        }).then(function(response){
                            //打印返回的json数据
                            response.json().then(function(data){
                                if(data.key) {
                                    Alert.alert("Registration successful","Please return to login",[{text: 'OK', onPress: () => { goBack(); }}])  //给弹出的提示框添加事件
                                } else {
                                    Alert.alert("Registration failed","Username already exists")
                                }
                            })
                        })
                    .catch((error) =>{
                        console.error(error);
                    });
                }
                    else {
                        Alert.alert("Registration failed","Password must be a minimum of 6 characters");
                    }
            } else {
                Alert.alert("Registration failed","Please confirm the password again");
            }
        } else {
            Alert.alert("Registration failed","Username is already taken");
        }
    } else {
        Alert.alert("Registration failed","Please enter username and password");
    }
  };

  login = () => {
    const { navigation } = this.props;  //获取navigation的navigate方法
    navigation.navigate('LoginPage');  //跳转到注册过的Register界面
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}  //设置背景被点击时，透明度不变
        onPress={this.blurTextInput}  //添加点击事件
        style={styles.container}>
        <View style={styles.textArea}>
          <Text style={styles.textTitle}>I’M NEW...</Text>
          <Text style={styles.text}>Creating an account with us is simple</Text>
          <Text style={styles.text}>You will then benefit from:</Text>
          <Text style={styles.text}>· Online moving object tracking</Text>
          <Text style={styles.text}>· Video downloads and historical records</Text>
        </View>
        <View
            style={styles.inputBox}>
            <TextInput
                ref="username"  //添加描述
                onChangeText={this.onUsernameChanged}  //添加值改变事件
                style={styles.input}
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'#ccc'}  //设置占位符颜色
                placeholder={'Please input user name '}  //设置占位符
            />
        </View>
        <View
            style={styles.inputBox}>
            <TextInput
                ref="password"  //添加描述
                onChangeText={this.onPasswordChanged}  //添加值改变事件
                style={styles.input}
                secureTextEntry={true}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'#ccc'}  //设置占位符颜色
                placeholder={'Please enter password'}  //设置占位符
            />
        </View>
        <View
            style={styles.inputBox}>
            <TextInput
                ref="confirmPassword"  //添加描述
                onChangeText={this.onConfirmPasswordChanged}  //添加值改变事件
                style={styles.input}
                secureTextEntry={true}  //设置为密码输入框
                autoCapitalize='none'  //设置首字母不自动大写
                underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                placeholderTextColor={'#ccc'}  //设置占位符颜色
                placeholder={'Please confirm password '}  //设置占位符
            />
        </View>
        <TouchableOpacity
            onPress={this.register}  //添加点击事件
            style={styles.button}>
            <Text
                style={styles.btText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.login}>
          <Text style={styles.ltext}>Already have an account?</Text>
          <TouchableOpacity
              onPress={this.login}  //添加点击事件
              style={styles.loginButton}>
              <Text
                  style={styles.lbtText}>Login</Text>
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
  textArea: {
      width: 280,
      marginTop: 60,
      marginBottom: 7,
  },
  textTitle: {
      fontSize: 18,
      marginBottom: 15,
  },
  text: {
      marginBottom: 8,
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
  button: {
      height: 40,
      width: 280,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: '#58812F',
      marginTop: 20,
  },
  btText: {
      color: '#fff',
      fontSize: 20,
  },
  login: {
    flexDirection:'row',
    marginTop: 20,
  },
  loginButton: {
    width: 60,
    borderRadius: 8,
  },
  ltext: {
    width: 220,
    paddingLeft: 20,
  },
  lbtText: {
      color: '#58812F',
      fontSize: 14,
  }
});