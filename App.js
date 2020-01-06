/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {FlatList, TouchableOpacity, View, Text, StatusBar} from 'react-native';
import moment from 'moment';
const begin = moment('04/01/2020', 'DD/MM/YYYY');
// const weeks = semanas();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
    };
  }
  componentDidMount() {
    this.semanas();
  }
  semanas() {
    let weeks = [];
    let tempDate = moment('04/01/2020', 'DD/MM/YYYY');
    let tempMoney = 5;
    for (let i = 0; i < 52; i++) {
      let week = {};
      week.key = i.toString();
      week.number = i + 1;
      week.date = tempDate.format('DD/MM/YYYY');
      week.money = tempMoney;
      week.complete = moment() > tempDate;
      tempDate.add(7, 'days');
      tempMoney += 5;
      weeks.push(week);
    }
    let weeksLeft = 52;
    weeks.map(week => {
      if (week.complete) {
        weeksLeft -= 1;
      }
    });
    this.setState({weeks: weeks, weeksLeft: weeksLeft});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{color: '#000', fontSize: 30, alignSelf: 'center'}}>
          {`${this.state.weeksLeft} Semanas Restando!!`}
        </Text>
        <FlatList data={this.state.weeks} renderItem={this.renderItem} />
      </View>
    );
  }
  renderItem = ({item, index}) => {
    let backgroundColor = item.complete ? 'green' : 'red';
    return (
      <TouchableOpacity
        onPress={() => this.setState()}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 4,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>
          {`${item.date} - Semana ${item.number} - R$${item.money},00`}
        </Text>
      </TouchableOpacity>
    );
  };
}

export default App;
