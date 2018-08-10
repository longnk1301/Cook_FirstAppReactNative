import React from 'react';
import { StyleSheet, FlatList, Text, View, Image, Alert, TouchableHighlight, Platform } from 'react-native';
import flastListData from './data/flastListData';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0
        };
    }

    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }

    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (sexId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({
                        activeRowKey: null
                    });
                }
            },
            onOpen: (sexId, rowId, direction) => {
                this.setState({
                    activeRowKey: this.props.item.key
                });
            },
            right: [
                {
                    onPress: () => {
                        this.props.parentFlatList.refs.editModal.showEditModal(flastListData[this.props.index], this);
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {
                                    flastListData.splice(this.props.index, 1);
                                    //Refresh flatList
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                }},
                            ],
                            {cancelable: true}
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ], 
            rowId: this.props.index,
            sextionId: 1
        };
        return (
            <Swipeout {...swipeSettings}>
                <View style={{ flex:1, flexDirection: 'column' }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: this.props.index % 2 == 0 ? 'darkseagreen' : 'darksalmon'
                    }}>
                        <Image 
                            source={{ uri: this.props.item.imageUrl }}
                            style={{ width: 100, height: 100, margin: 10 }}
                        >
                        </Image>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={styles.conten}>{this.props.item.content}</Text>
                        </View>
                    </View>
                    <View style={{height: 1, backgroundColor: 'white'}}>

                    </View>
                </View>
            </Swipeout>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            deleteRowKey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deleteRowKey: activeKey
            };
        });
        this.refs.flatlist.scrollToEnd();
    }

    _onPressAdd() {
        this.refs.addModal.showAddModal();
    }

    render() {
        return (
            <View style={styles.container}>
            <View 
                style={{
                    backgroundColor: 'ivory',
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                <TouchableHighlight 
                    style={{ marginRight: 10}} 
                    underlayColor = 'ivory'
                    onPress={this._onPressAdd}
                >
                    <Image 
                        style={{ width: 35, height: 35, color: 'white'}}
                        source={{uri: 'https://julienbraida-van3kfw.netdna-ssl.com/wp-content/uploads/2015/01/add-icon.png'}}
                    >
                    </Image>
                </TouchableHighlight>

            </View>
                <FlatList 
                    ref={"flatlist"}
                    data={flastListData}
                    renderItem={({item, index}) => {
                        // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <FlatListItem 
                                item={item}
                                index={index}
                                parentFlatList={this}
                            >
                            </FlatListItem>
                        )
                    }}
                >
                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this}>

                </AddModal>

                <EditModal ref={'editModal'} parentFlatList={this}>

                </EditModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 23,
    // Platform.OS === 'ios' ? 34 : 0
},
    conten: {
        color: 'white',
        padding: 10,
        fontSize: 30,
    },
});
