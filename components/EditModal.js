import React from 'react';
import { StyleSheet, FlatList, Text, View, Image, Alert, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flastListData from '../data/flastListData';

var screen = Dimensions.get('window');

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            foodName: ''
        }
    }

    showEditModal = (editingFood, flastListItem) => {
        console.log(`editingFood = ${JSON.stringify(editingFood)}`);
        this.setState({
            key: editingFood.key,
            foodName: editingFood.content,
            flastListItem: flastListItem
        });
        this.refs.myModal.open();
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
                >Food Infomations</Text>

                <TextInput 
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                    placeholder="Enter food name!"
                    value={this.state.foodName}
                    onChangeText={(text) => this.setState({
                        foodName: text
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
                        if (this.state.foodName.length == 0) {
                            alert("You may enter food name!");
                            return;
                        }
                        //Update
                        var foundIndex = flastListData.findIndex(item => this.state.key == item.key);
                        if (foundIndex < 0) {
                            return;
                        }
                        flastListData[foundIndex].content = this.state.foodName;
                        this.state.flastListItem.refreshFlatListItem();
                        this.refs.myModal.close();
                    }}
                >Save</Button>
            </Modal>
        );
    }
}