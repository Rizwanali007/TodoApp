import React, { FC, ReactElement, useEffect, useRef, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import ModalView from "./ModalView"
import { observer } from "mobx-react-lite"
import UpdateData from "./updateData";
import { GetToken } from "./asyncStorage";
import { AppStackScreenProps } from "../navigators"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface HomeScreenProps extends AppStackScreenProps<"HomeScreen"> { }

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  const { navigation } = _props

  const [data, setData] = useState([]);
  const [masterData, setmasterData] = useState([])
  const [search, setSearch] = useState('')
  const [completee, setComplete] = useState([])


  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    await firestore()
      .collection('newTodo')
      .onSnapshot(data => {

        // console.log("data.docsss", data.docs)
        setmasterData(data.docs);
        // setComplete(data.docs)
        filterData(data.docs);
      })


  };

  const filterData = async (idd) => {
    const userId = await GetToken()
    let itemTemp = idd.filter(x => x._data.Userid == userId)
    setData(itemTemp)
    // console.log("itemTemp", itemTemp)
  }




  const deleteTodo = async (id) => {
    await firestore().collection("newTodo")
      .doc(id).delete().then(() => {
        alert('Todo Deleted!!!!!')
      })
    deleted(id)
  }

  const deleted = (id) => {
    let itemTemp = completee.filter(x => x._data.todoId !== id)
    setComplete(itemTemp)
  }

  // const searchFilter = (text) => {
  //   if (text) {
  //     const newData = masterData.filter((item) => {
  //       const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setData(newData);
  //     setSearch(text);
  //   }
  //   else {
  //     setData(masterData);
  //     setSearch(text);
  //   }
  // }

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate('Login')
      }
      ).catch((error) => {
        console.log("ERROR LOGOUT", error)
      })

  }

  function goSubtask(item) {
    navigation.navigate("SubTask", { itemm: item })
  }

  function complete(id, item) {

    let itemTemp = data.filter(x => x._data.todoId !== id)
    // console.log("itemTemp", itemTemp)
    setData(itemTemp)

    setComplete([item, ...completee])
    // console.log("completeeee", completee)

  }

  return (
    <View style={{ alignItems: 'center', }}>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: 10 }}>ToDo LisT</Text>
      </View>
      <View style={{ marginLeft: 300, marginTop: -10 }}>
        <TouchableOpacity style={{ backgroundColor: "#ece75f", borderRadius: 10, }}
          onPress={() => logOut()}
        >
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline', marginTop: -15 }}>LoGOut </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{ marginTop: 15 }}>
        <TextInput style={{ marginTop: 15, marginRight: 15, marginLeft: 15, borderWidth: 1, borderColor: "grey", borderRadius: 10, width: 320 }}
          placeholder="  search here"
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View> */}
      <View style={{ width: "80%", height: 320, marginTop: 60 }}>

        <FlatList

          data={data}

          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => goSubtask(item)}
              >
                <View style={{ marginTop: 10, borderRadius: 10, backgroundColor: "skyblue" }}>
                  <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600' }}>Name: {item._data.heading}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Description: {item._data.description}</Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>Id: {item._data.id} </Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>UID: {item._data.todoId} </Text>
                    <TouchableOpacity style={{ backgroundColor: "#00A86B", margin: 5, marginLeft: 55, marginRight: 55, borderRadius: 10, marginTop: 20 }}
                      onPress={() => complete(item._data.todoId, item)}
                    >
                      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Completed </Text>
                    </TouchableOpacity>
                    <UpdateData taskData={item}
                    />

                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />

      </View>
      <View>

        <View style={{ height: 750, width: 300, alignItems: 'center', marginRight: 65 }}>
          <ModalView />
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
                    <Text style={{ fontSize: 15, fontWeight: '600', textDecorationLine: 'underline' }}>UID: {item._data.todoId} </Text>
                    <TouchableOpacity style={{ backgroundColor: "#C21807", margin: 5, marginLeft: 55, marginRight: 55, borderRadius: 10, marginTop: 20 }}
                      onPress={() => deleteTodo(item._data.todoId)}
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