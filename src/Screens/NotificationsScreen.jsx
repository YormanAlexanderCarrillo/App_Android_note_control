import React, { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationList from "../Components/NotificationsScreenComponents/NotificationList";
import NotificationService from "../Services/NotificationService";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationsScreen() {
  const [tasks, setTasks] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState();
  const [switchIsEnable, setSwitchIsEnable] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const loadSwitchState = async () => {
    const storedSwitchState = await AsyncStorage.getItem(
      "notificationsEnabled"
    );
    if (storedSwitchState !== null) {
      setSwitchIsEnable(JSON.parse(storedSwitchState));
    }
  };

  const fetchTasks = async () => {
    const tasksFromBackend = [
      {
        id: "1",
        title: "Tarea para notificación de una hora",
        description: "Esta tarea activará la notificación de una hora antes",
        fechaentrega: "2024-07-13T21:20:00Z",
      },
      {
        id: "2",
        title: "Tarea para notificación de un día",
        description: "Esta tarea activará la notificación de un día antes",
        fechaentrega: "2024-07-14T15:20:00Z",
      },
      {
        id: "3",
        title: "Tarea para notificación de una semana",
        description: "Esta tarea activará la notificación de una semana antes",
        fechaentrega: "2024-07-26T15:20:00Z",
      },
    ];

    setTasks(tasksFromBackend);
  };

  useEffect(() => {
    loadSwitchState();

    NotificationService.registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );
    NotificationService.createChannel();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    fetchTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadSwitchState = async () => {
        const storedSwitchState = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        if (storedSwitchState !== null) {
          setSwitchIsEnable(JSON.parse(storedSwitchState));
        }
      };

      loadSwitchState();
    }, [])
  );

  useEffect(() => {
    const updateNotifications = async () => {
      if (switchIsEnable) {
        for (const task of tasks) {
          await NotificationService.scheduleTaskNotification(task, "oneHour");
          await NotificationService.scheduleTaskNotification(task, "oneDay");
          await NotificationService.scheduleTaskNotification(task, "oneWeek");
        }
      } else {
        await NotificationService.cancelAllNotifications();
      }
    };

    updateNotifications();
  }, [switchIsEnable, tasks]);

  const handleSwitch = async () => {
    const newSwitchState = !switchIsEnable;
    setSwitchIsEnable(newSwitchState);
    await AsyncStorage.setItem(
      "notificationsEnabled",
      JSON.stringify(newSwitchState)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.header}>Notificaciones</Text>
          <Switch
            value={switchIsEnable}
            trackColor={{ false: "#7c7c7c", true: "#03993A" }}
            thumbColor={"#ffffff"}
            onValueChange={handleSwitch}
          />
        </View>

        <NotificationList tasksNotification={tasks} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
