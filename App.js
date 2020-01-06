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

/**Set the initial date here*/

//2020 - first Saturday
const begin = moment('04/01/2020', 'DD/MM/YYYY');
//2021 - first Saturday
// const begin = moment('02/01/2021', 'DD/MM/YYYY');
//2022 - first Saturday
// const begin = moment('01/01/2022', 'DD/MM/YYYY');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
    };
  }
  componentDidMount() {
    this.setWeeks();
  }
  setWeeks() {
    let weeks = [];
    let tempDate = moment(begin);
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
    let ammountSaved = 0;
    weeks.map(week => {
      if (week.complete) {
        weeksLeft -= 1;
        ammountSaved += week.money;
      }
    });
    this.setState({
      weeks: weeks,
      weeksLeft: weeksLeft,
      ammountSaved: ammountSaved,
    });
  }
  render() {
    return (
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <Text style={{color: '#000', fontSize: 30, margin: 8}}>
          {`${this.state.weeksLeft} Semanas restando!!`}
        </Text>
        <Text style={{color: '#000', fontSize: 18, margin: 8}}>
          {`R$${this.state.ammountSaved},00 poupados`}
        </Text>
        <FlatList
          data={this.state.weeks}
          renderItem={this.renderItem}
          style={{width: '90%'}}
        />
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
