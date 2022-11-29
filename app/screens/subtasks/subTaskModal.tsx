import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../screens/utils/firebase'
import { GetToken } from '../asyncStorage';
import firestore from '@react-native-firebase/firestore';

const SubTaskModalView = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [addTask, setAddTask] = useState('')
    const [addDescription, setAddDescription] = useState('')
    const [addId, setAddId] = useState('')

    const addTodo = async () => {
        const todoRef = await firestore().collection('subTodo').doc();
        let UId = todoRef.id
        const taskId = props.todoo
        todoRef.set({
            subTodoId: UId,
            heading: addTask,
            id: addId,
            description: addDescription,
            Taskid: taskId
        })
        alert("sub TOdo Added!")
    }

    return (
        <View style={{ height: "100%", marginTop: 40, flex: 1, alignItems: "center" }}>
            <TouchableOpacity style={{ height: '7%', width: '60%', backgroundColor: "grey", borderRadius: 15, marginLeft: 75 }}
                onPress={() => { setShowModal(true) }}
            >
                <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 20, fontWeight: '600', margin: 10 }}>Add Task </Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <Modal visible={showModal} transparent={true}>
                    {/* <ScrollView> */}
                    <View style={{ backgroundColor: "#000000aa", height: 300, marginTop: 300 }}>
                        <View style={{ margin: 5, backgroundColor: "#ffffff", flex: 1, borderRadius: 8, padding: 50 }}>
                            <Text style={{ marginTop: -40, fontWeight: '600' }}>  Name:</Text>
                            <TextInput
                                placeholder='Enter Task Name'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addTask}
                                onChangeText={(heading) => setAddTask(heading)}
                            />
                            <Text style={{ marginTop: 10, fontWeight: '600' }}>  Description:</Text>
                            <TextInput
                                placeholder='Enter Task Description'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addDescription}
                                onChangeText={(description) => setAddDescription(description)}
                            />
                            <Text style={{ marginTop: 10, fontWeight: '600' }}>  Id:</Text>
                            <TextInput
                                placeholder='Enter The Id'
                                style={{ borderColor: 'black', borderWidth: 1, height: 40, marginTop: 5, borderRadius: 10 }}
                                value={addId}
                                onChangeText={(id) => setAddId(id)}
                            />
                            <TouchableOpacity style={{ alignItems: 'center', marginTop: 25, backgroundColor: "#00A86B", borderRadius: 10, width: "40%", marginLeft: 75 }}
                                onPress={() => {
                                    setShowModal(false)
                                    addTodo()
                                }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Add </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </ScrollView> */}
                </Modal>
            </KeyboardAvoidingView>
        </View>
    )
}

export default SubTaskModalView