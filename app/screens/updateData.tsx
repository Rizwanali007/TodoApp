import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore';


const UpdateData = (props) => {

    const [showModal, setShowModal] = useState(false)
    const [addTask, setAddTask] = useState(props.taskData._data.heading)
    const [addDescription, setAddDescription] = useState(props.taskData._data.description)
    const [addId, setAddId] = useState(props.taskData._data.id)
    const [complete, setCompelte] = useState('false')


    const todoRef = firestore().collection('newTodo');


    const updateData = async (id) => {
        if (addTask && addTask.length > 0) {
            const data = {
                heading: addTask,
                id: addId,
                description: addDescription,
            };
            todoRef.doc(id).update(data).then(() => {
                setAddTask('');
            }).catch((error) => {
                console.log("ADD DATA ERROR UPDATE", error)
            })
        }

    }

    return (
        <View style={{ height: "100%", marginTop: 40, flex: 1, alignItems: "center" }}>
            <TouchableOpacity style={{ backgroundColor: "white", marginTop: -30, marginLeft: 35, marginRight: 35, height: 25, width: 160, borderRadius: 10 }}
                onPress={() =>
                    setShowModal(true)}
            >
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Update </Text>
            </TouchableOpacity>
            <Modal visible={showModal} transparent={true}>
                <ScrollView>
                    <View style={{ backgroundColor: "#000000aa", height: 300, marginTop: 300 }}>
                        <View style={{ margin: 5, backgroundColor: "#ffffff", flex: 1, borderRadius: 8, padding: 50 }}>
                            <Text style={{ marginTop: -40, fontWeight: '600' }}>  Name:</Text>
                            <TextInput
                                placeholder='Enter Name'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addTask}
                                onChangeText={(text) => setAddTask(text)}
                            />
                            <Text style={{ marginTop: 10, fontWeight: '600' }}>  Description:</Text>
                            <TextInput
                                placeholder='Enter Descrp'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addDescription}
                                onChangeText={(text) => setAddDescription(text)}
                            />
                            <Text style={{ marginTop: 10, fontWeight: '600' }}>  Id:</Text>
                            <TextInput
                                placeholder='Enter Id'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addId}
                                onChangeText={(text) => setAddId(text)}
                            />
                            <TouchableOpacity style={{ alignItems: 'center', marginTop: 20, backgroundColor: "#00A86B", borderRadius: 10, width: "40%", marginLeft: 75 }}
                                onPress={() => {
                                    setShowModal(false)
                                    updateData(props.taskData._data.todoId)
                                }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>update  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default UpdateData