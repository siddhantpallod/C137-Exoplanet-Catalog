import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {ListItem} from 'react-native-elements';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listData : [],
            url: 'http://localhost:5000/'
        }
    }

    componentDidMount(){
        this.getPlanets()
    }

    getPlanets = async() => {
        const {url} = this.state
        await axios.get(url).then(response => {
            return(
                this.setState({
                    listData: response.data.data
                })
            )
        }).catch((error)=>{
            alert(error.message)
        })
    }

    

    renderItem = (item, index) => {
        <ListItem
            key = {index}
            title =  {`Planet: ${item.name}`}
            subtitle = {`Distance From Earth ${item.distance_from_earth}`}
            titleStyle = {styles.title}
            containerStyle = {styles.listContainer}
            bottomDivider
            chevron
            onPress = {() => this.props.navigation.navigate('Details', {planet_name: item.name})}
        />
    }

    keyExtracter = (item, index) => index.toString()

  render() {
    const {listData} = this.state

    if(listData.length === 0){
        return(
            <View style = {styles.loadingContainer}>
                <Text style = {styles.loadingContainerText}> Loading.. </Text>
                <ActivityIndicator  color = '#7ab451' />
            </View>
        )
    }
    return (
      <View style = {styles.container}>
        <SafeAreaView />
        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}> Planet's World </Text>
        </View>
        <View style = {styles.flatlistContainer}>
            <FlatList
                
                keyExtractor = {this.keyExtracter}
                data = {this.state.listData}
                renderItem = {this.renderItem}
            />
        </View>
      </View>
    );
}
}

export default HomeScreen;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'blue'
    },
    headerContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight : 'bold',
    },
    flatlistContainer: {
        flex: 0.9
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    loadingContainerText: {
        fontSize: 20,
        textAlign: 'center'
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'yellow'
    },
    listContainer: {
        backgroundColor: 'orange'
    }
})