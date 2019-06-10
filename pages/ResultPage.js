import React from 'react';
import {
  Text,
  StyleSheet,   
  View,
} from 'react-native';

export default class ResultPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Moving objects:</Text>
                {this.props.navigation.state.params.result.cat===0?
                    <View></View>:<Text style={styles.text}>&nbsp;&nbsp;cat:&nbsp;{this.props.navigation.state.params.result.cat}</Text>
                }
                {this.props.navigation.state.params.result.dog===0?
                    <View></View>:<Text style={styles.text}>&nbsp;&nbsp;dog:&nbsp;{this.props.navigation.state.params.result.dog}</Text>
                }
                {this.props.navigation.state.params.result.bus===0?
                    <View></View>:<Text style={styles.text}>&nbsp;&nbsp;bus:&nbsp;{this.props.navigation.state.params.result.bus}</Text>
                }
                {this.props.navigation.state.params.result.car===0?
                    <View></View>:<Text style={styles.text}>&nbsp;&nbsp;car:&nbsp;{this.props.navigation.state.params.result.car}</Text>
                }

                
                {this.props.navigation.state.params.result.bird===0?
                    <View></View>:<Text style={styles.text}>&nbsp;&nbsp;bird:&nbsp;{this.props.navigation.state.params.result.bird}</Text>
                }
                {this.props.navigation.state.params.result.boat===0?
                    <View></View>:<Text style={styles.text}>&nbsp;boat:&nbsp;{this.props.navigation.state.params.result.boat}</Text>
                }

                {this.props.navigation.state.params.result.bench===0?
                    <View></View>:<Text style={styles.text}>bench:&nbsp;{this.props.navigation.state.params.result.bench}</Text>
                }
                {this.props.navigation.state.params.result.train===0?
                    <View></View>:<Text style={styles.text}>train:&nbsp;{this.props.navigation.state.params.result.train}</Text>
                }
                {this.props.navigation.state.params.result.truck===0?
                    <View></View>:<Text style={styles.text}>truck:&nbsp;{this.props.navigation.state.params.result.truck}</Text>
                }


                {this.props.navigation.state.params.result.person===0?
                    <View></View>:<Text style={styles.text}>person:&nbsp;{this.props.navigation.state.params.result.person}</Text>
                }

                {this.props.navigation.state.params.result.bicycle===0?
                    <View></View>:<Text style={styles.text}>bicycle:&nbsp;{this.props.navigation.state.params.result.bicycle}</Text>
                }
                
                {this.props.navigation.state.params.result.motorbike===0?
                    <View></View>:<Text style={styles.text}>motorbike:&nbsp;{this.props.navigation.state.params.result.motorbike}</Text>
                }
                {this.props.navigation.state.params.result.aeroplane===0?
                    <View></View>:<Text style={styles.text}>aeroplane:&nbsp;{this.props.navigation.state.params.result.aeroplane}</Text>
                }
                
                {this.props.navigation.state.params.result.stop_sign===0?
                    <View></View>:<Text style={styles.text}>stop sign:&nbsp;{this.props.navigation.state.params.result.stop_sign}</Text>
                }
                {this.props.navigation.state.params.result.fire_hydrant===0?
                    <View></View>:<Text style={styles.text}>fire hydrant:&nbsp;{this.props.navigation.state.params.result.fire_hydrant}</Text>
                }
                {this.props.navigation.state.params.result.parking_meter===0?
                    <View></View>:<Text style={styles.text}>parking meter:&nbsp;{this.props.navigation.state.params.result.parking_meter}</Text>
                }
                {this.props.navigation.state.params.result.traffic_light===0?
                    <View></View>:<Text style={styles.text}>traffic light:&nbsp;{this.props.navigation.state.params.result.traffic_light}</Text>
                }    
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingTop: 50,
    },
    text:{
        marginBottom:15,
        fontSize: 16
    }
  });