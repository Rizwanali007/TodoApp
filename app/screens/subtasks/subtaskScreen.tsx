import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import SubTaskModalView from "./subTaskModal"
import { observer } from "mobx-react-lite"
import SubTaskUpdateData from "./subTaskUpdate"
import { AppStackScreenProps } from "../../navigators/AppNavigator"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface subTaskScreenProps extends AppStackScreenProps<"SubTask"> { }

export const subTaskScreen: FC<subTaskScreenProps> = observer(function subTaskScreen(_props) {
    const { navigation, route } = _props

    const { itemm } = route.params;
    console.log("................itemId...............", itemm._data.todoId)

    useEffect(() => {
        getData()
    }, []);

    const [data, setData] = useState([]);
    const [completee, setComplete] = useState([])


    const getData = async () => {
        await firestore()
            .collection('subTodo')
            .onSnapshot(data => {
                setData(data.docs)
                filterData(data.docs);
            })
    };

    const filterData = async (item) => {
        const taskId = itemm._data.todoId
        let itemTemp = item.filter(x => x._data.Taskid == taskId)
        setData(itemTemp)
        // console.log("itemTemp", itemTemp)
    }

    const deleteTodo = async (id) => {
        firestore().collection("subTodo")
            .doc(id).delete().then(() => {
                alert('Todo Deleted!!!!!')
            })
        deleted(id)
    }

    const deleted = (id) => {
        let itemTemp = completee.filter(x => x._data.subTodoId !== id)
        setComplete(itemTemp)
    }

    const goBackToTODOS = () => {
        navigation.navigate('HomeScreen')
    }

    function complete(id, item) {

        let itemTemp = data.filter(x => x._data.subTodoId !== id)
        // console.log("itemTemp", itemTemp)
        setData(itemTemp)

        setComplete([item, ...completee])
        // console.log("completeeee", completee)

    }


    return (
        <View style={{ alignItems: 'center', }}>
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10 }}>SubTasks </Text>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10 }}>{itemm._data.heading} </Text>
            </View>
            <View style={{ marginLeft: 300, marginTop: -60 }}>
                <TouchableOpacity style={{ backgroundColor: "#ece75f", borderRadius: 10, }}
                    onPress={() => goBackToTODOS()}
                >
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: -15 }}>Back </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "80%", height: 300, marginTop: 90 }}>

                <FlatList

                    data={data}

                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginTop: 10, borderRadius: 10, backgroundColor: "skyblue" }}>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Name: {item._data.heading}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Description: {item._data.description}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Id: {item._data.id} </Text>
                                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>TaskId: {item._data.Taskid} </Text>
                                    <TouchableOpacity style={{ backgroundColor: "#00A86B", margin: 5, marginLeft: 55, marginRight: 55, borderRadius: 10, marginTop: 20 }}
                                        onPress={() => complete(item._data.subTodoId, item)}
                                    >
                                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Completed </Text>
                                    </TouchableOpacity>
                                    <SubTaskUpdateData taskData={item} />
                                </View>
                            </View>
                        )
                    }}
                />

            </View>
            <View>
                <View style={{ height: 750, width: 300, alignItems: 'center', marginRight: 65 }}>
                    <SubTaskModalView todoo={itemm._data.todoId} />
                </View>
                <View style={{ marginTop: -650, alignItems: "center" }}>
                    <Text style={{ fontSize: 30, fontWeight: '700', textDecorationLine: 'underline', marginTop: 10 }}>Completed Task  </Text>
                </View>
                <View style={{ width: "90%", height: 170, marginTop: 5, }}>
                    <FlatList


                        data={completee}
                        horizontal={true}
                        renderItem={({ item }) => {

                            return (
                                <View style={{ width: 300, marginTop: 10, borderRadius: 10, backgroundColor: "skyblue", marginBottom: 5, marginHorizontal: 10 }}>
                                    <View style={{ margin: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Name: {item._data.heading}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Description: {item._data.description}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Id: {item._data.id} </Text>
                                        <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>UID: {item._data.subTodoId} </Text>
                                        <TouchableOpacity style={{ backgroundColor: "#C21807", margin: 5, marginLeft: 55, marginRight: 55, borderRadius: 10, marginTop: 20 }}
                                            onPress={() => deleteTodo(item._data.subTodoId)}
                                        >
                                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Delete </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                    />

                </View>
            </View>


        </View >
    )
})