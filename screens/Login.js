import { View, Text, SafeAreaView, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants'
import { getAuth,signInWithEmailAndPassword} from '../firebase/Config'

export default function Login({setLogin}) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        const auth = getAuth()

        signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            console.log(userCredential.user) // Print out info to console just to see what is returned.
            setLogin(true)
        }).catch((error) => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                console.log('Invalid credentials')
            } else if ((error.code === 'auth/too-many-requests')) {
                console.log('Too many attempts to login')
            } else {
                console.log(error.code + ' ' + error.message)
            }
        })
    }

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.field}>Username</Text>
            <TextInput placeholder='Type email here' value={user} onChangeText={text => setUser(text)}/>
            <Text style={styles.field}>Password</Text>
            <TextInput placeholder='Type password here' value={password} onChangeText={text => setPassword(text)}/>
            <Button title='Login' onPress={login}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 10,
        paddingRight: 10,
    },
    heading: {
        fontSize: 25,
    },
    field: {
        fontSize: 20,
        paddingTop: 10,
    },
});