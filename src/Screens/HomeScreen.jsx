import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/HomeScreenComponents/Header";
import { windowHeight } from "../Utils/Constants";
import CardTaskSubject from "../Components/HomeScreenComponents/CardTaskSubject";
import StatusTasks from "../Components/HomeScreenComponents/StatusTask";
import TaskCompleted from "../Components/HomeScreenComponents/TaskCompleted";
import TaskPending from "../Components/HomeScreenComponents/TaskPending";
import TaskInProgress from "../Components/HomeScreenComponents/TaskInProgress";

export default function HomeScreen() {
  const [showInProgress, setShowInProgress] = useState(true);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const showTaskProgress = () => {
    setShowInProgress(true);
    setShowPending(false);
    setShowCompleted(false);
  };
  const showTaskPending = () => {
    setShowPending(true);
    setShowInProgress(false);
    setShowCompleted(false);
  };
  const showTaskCompleted = () => {
    setShowCompleted(true);
    setShowPending(false);
    setShowInProgress(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.containerHeader}>
        <Header />
      </View>
      <View style={styles.containerCards}>
        <CardTaskSubject />
      </View>
      <View style={styles.containerBtnsStatus}>
        <StatusTasks
          onProgress={showTaskProgress}
          onPending={showTaskPending}
          onCompleted={showTaskCompleted}
        />
      </View>
      <View style={styles.containerProgress}>
        {showInProgress && <TaskInProgress />}
        {showPending && <TaskPending />}
        {showCompleted && <TaskCompleted />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  containerHeader: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCards: {
    flex: windowHeight * 0.0009,
  },
  containerBtnsStatus: {
    flex: 0.4,
  },
  containerProgress: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
