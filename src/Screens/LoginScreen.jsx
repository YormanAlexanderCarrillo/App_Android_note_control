import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Image,
} from "react-native";
import React from "react";
import LoginForm from "../Components/LoginScreenComponents/LoginForm";

export default function LoginScreen({ checkUid }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar />
            <View style={styles.container}>
                <LoginForm checkUid={checkUid} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});