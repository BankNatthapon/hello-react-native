  import React from 'react';
  import {
    Button,
    StyleSheet,
    View,
    Text,
    TextInput,
    Acc
  } from 'react-native';
  import { Speech, Util, WebBrowser } from 'expo';

  export default class KeepAwakeExample extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        millisec: 0,
        second: 0,
        minute: 0,
        hour: 0,

        millisec_time: 0,
        second_time: 0,
        minute_time: 0,
        hour_time: 0,

        text: 'Hello'
      }

      setInterval(() => {
        if(this.state.millisec_time === 99) { this.setState({ millisec_time: 0, second_time: this.state.second_time + 1 })
          if(this.state.second_time === 59) this.setState({ second_time: 0, minute_time: this.state.minute_time + 1 })
              if(this.state.minute_time === 59) this.setState({ minute_time: 0, hour_time: this.state.hour_time + 1 })
        } else this.setState({ millisec_time: this.state.millisec_time + 1 })
      }, 1)

      Timer = () => {
        if(this.state.millisec === 99) { this.setState({ millisec: 0, second: this.state.second + 1 })
          if(this.state.second === 59) this.setState({ second: 0, minute: this.state.minute + 1 })
              if(this.state.minute === 59) this.setState({ minute: 0, hour: this.state.hour + 1 })
        } else this.setState({ millisec: this.state.millisec + 1 })
      }
    }

    _StartTimer = () => {
      StopTimer = setInterval(Timer)
    }

    _StopTimer = () => {
      clearInterval(StopTimer)
    }

    _ResetTimer = () => {
      this.setState({
        millisec: 0,
        second: 0,
        minute: 0,
        hour: 0,
      });
    }

    HelloP_New = () => {
      Speech.speak('สวัสดีพี่นิวสุดโหด', {
        language: 'th'
      })
    }

    _ReadVocabulary = () => {
      Speech.speak('Student', {
        language: 'en'
      })
    }

    _Translate = () => {
      Speech.speak('แปลว่า นักเรียน', {
        language: 'th'
      })
    }

    _ASignASong = () => {
      Speech.speak('พันหมื่นเหตุผล ที่บอกกับฉัน คือความผูกพันเธอนั้นไม่มีเหลืออยู่ พันหมื่นเหตุผล ที่เธอยืนยันให้รับรู้ ยิ่งฟังดูไม่ได้ความไม่มีค่าใด มีหนึ่งเหตุผล ยังปิดเอาไว้ คือเธอต้องการกันฉันให้พ้นทาง เพื่อให้เขาและเธอนั้นได้มารักกัน เหตุผลข้อเดียว คือข้อนั้น คือไม่รักกัน แค่นั้นเอง อิอิ' , 
      {
        language: 'th',
        rate: 0.5,
      })
    }

    _StopASignASong = () => {
      Speech.stop()
    }

    _handlePressButtonAsync = async () => {
      let result = await WebBrowser.openBrowserAsync('https://mebank-resume.firebaseapp.com');
      this.setState({ result });
    };

    render() {
      return (

        <View style={ styles.container }>

          <View style={styles.time_area}>
              <Text style={styles.time}> {this.state.hour_time} : {this.state.minute_time} : {this.state.second_time} : {this.state.millisec_time} </Text>
          </View>

          <View style={styles.timer_area}>
            <Text style={styles.timer}> Timer : {this.state.hour} : {this.state.minute} : {this.state.second} : {this.state.millisec} </Text>
            <View style={styles.option_timer}>
              <Button onPress={this._StartTimer} title='Start' />
              <Button onPress={this._StopTimer} title='Stop' />
              <Button onPress={this._ResetTimer} title='Reset' />
            </View>
          </View>

          <TextInput
            style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, margin: 30 }}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />

          <Button onPress={this.HelloP_New} title='สวัสดีพี่นิวสุดโหด ^^'/>

          <Text style={{ color: 'green', fontSize: 20, }}>Student แปลว่า นักเรียน</Text>

          <Button onPress={this._ReadVocabulary} title='คำอ่าน'/>
          <Button onPress={this._Translate} title='คำแปล'/>
          <Button onPress={this._ASignASong} title='ร้องเพลง พันหมื่นเหตุผล'/>
          <Button onPress={this._StopASignASong} title='หยุดร้อง'/>
          <Button title="Open MeBank Website" onPress={this._handlePressButtonAsync} />


        </View>
      );

    }
  }

  const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'pink',
        },
        time_area: {
          marginTop: 25,
          marginLeft: 190,
        },
        time: {
          color: '#000',
          fontSize: 20,
        },
        timer_area: {
          alignItems: 'flex-start',
          marginTop: 25
        },
        timer: {
          color: '#000',
          fontSize: 20
        },
        option_timer: {
          flexDirection: 'row',
        }
  });
