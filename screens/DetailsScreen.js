import { Container } from '@material-ui/core';
import React from 'react'
import { Text, View } from 'react-native';
import {Card} from 'react-native-elements';

export class DetailsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            details: {},
            imagePath: '',
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam('planet_name')}`,

        }
    }

    setDetails = (planetDetails) => {
        const planetType = planetDetails.planet_type
        var imagePath = ''
        
        switch(planet_type){
            case 'Gas Giant': imagePath = require('../assets/gas_giant.png')
            break;
            case 'Terrestrial': imagePath = require('../assets/terrestrial.png')
            break;
            case 'Super Earth': imagePath = require('../assets/super_earth.png')
            break;
            case 'Neptune Like': imagePath = require('../assets/neptune_like.png')
            break;
            default: imagePath = require('../assets/gas_giant.png')
        }

        this.setState({
            details: planetDetails,
            imagePath: imagePath
        })
    }

    getPlanets = async() => {
        const {url} = this.state
        await axios.get(url).then(response => {
            this.setDetails(response.data.data)
        }).catch((error)=>{
            alert(error.message)
        })
    }

    render() {
        const {details, imagePath} = this.state;
        if(details.specifications){
            return (
                <View>
                    <Card title = {details.name} image = {imagePath} imageProps = {{resizeMode: Container, width: '100%'}}>  
                    <View>
                        <Text> {`Distance From Earth ${details.distance_from_earth}`} </Text>
                        <Text> {`Distance From Sun ${details.distance_from_their_sun}`} </Text>
                        <Text> {`Gravity ${details.gravity}`} </Text>
                        <Text> {`Orbital Period ${details.orbital_period}`} </Text>
                        <Text> {`Orbital Speed ${details.orbital_speed}`} </Text>
                        <Text> {`Planet Mass ${details.planet_mass}`} </Text>
                        <Text> {`Planet Radius ${details.planet_radius}`} </Text>
                        <Text> {`Planet Type ${details.planet_type}`} </Text>
                    </View>
                    <View>
                        <Text> {details.specifications ? `Specifications: ` : ' '} </Text>
                        {details.specifications.map((item, index) => (
                            <Text key = {index.toString()}> {item} </Text>
                        ))}
                    </View>
                    </Card>
                </View>
            )
        }
        else{
            return null;
        }
    }
}

export default DetailsScreen;