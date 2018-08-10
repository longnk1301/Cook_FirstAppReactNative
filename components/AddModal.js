import React from 'react';
import { StyleSheet, FlatList, Text, View, Image, Alert, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flastListData from '../data/flastListData';

var screen = Dimensions.get('window');

export default class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            newFoodName: ''
        }
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }
    
    generateKey(key) {
        let ids = key.map((item) => {
        });
        let lenght = ids.length;
        let number = lenght++;
        // alert(lenght);
        return number;
    }

    render(){
        return (
            <Modal 
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    width: screen.width - 80,
                    height: 280,
                    borderRadius: 10,
                    shadowRadius: 20
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert('Modal closed!')
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginTop: 20
                        // alignItems: 'flex-start'
                    }}
                >New Food's Infomations</Text>

                <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                    placeholder="Enter new food's name!"
                    value={this.state.newFoodName}
                    onChangeText={(text) => this.setState({
                        newFoodName: text
                    })}
                />

                <Button 
                    style={{
                        fontSize: 18,
                        color: 'white'
                    }}
                    containerStyle={{
                        marginLeft: 70,
                        marginRight: 70,
                        padding: 8,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: 'darkseagreen'
                    }}
                    onPress={() => {
                        if (this.state.newFoodName.length == 0) {
                            alert("You may enter new food's name!");
                            return;
                        }
                        const newKey = this.generateKey(flastListData);
                        const newFood = {
                            key: newKey,
                            content: this.state.newFoodName,
                            imageUrl: 'https://images.agoramedia.com/everydayhealth/gcms/best-ra-foods-722x406.jpg'
                        };
                        flastListData.push(newFood);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        this.refs.myModal.close();
                    }}
                >Save</Button>
            </Modal>
        );
    }
}