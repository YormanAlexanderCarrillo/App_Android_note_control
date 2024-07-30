import React, { useEffect, useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import NotificationService from "../../Services/NotificationService";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import NotificationList from "./NotificationList";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function NotificationsComponent() {
  const URLAPI = process.env.EXPO_PUBLIC_API_URL;
  const [tasks, setTasks] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState();
  const [switchIsEnable, setSwitchIsEnable] = useState(false);
  const [shownNotifications, setShownNotifications] = useState([]);
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
    try {
      const Token = await AsyncStorage.getItem("Token");
      if (Token) {
        const decode = jwtDecode(Token);
        axios
          .get(`${URLAPI}/activity/getActivitysToIdUser/${decode.id}`, {
            headers: {
              Authorization: `${Token}`,
            },
          })
          .then((response) => {
            if (response.data.status === true) {
              const taskBackend = response.data.data;
              const formatterTask = taskBackend.map((task) => ({
                id: task._id,
                title: task.name,
                fechaentrega: task.dateEntry,
              }));

              setTasks(formatterTask);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log("Error al obtener el token:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const init = async () => {
        await loadSwitchState();
        const token =
          await NotificationService.registerForPushNotificationsAsync();
        if (token) setExpoPushToken(token);
        await NotificationService.createChannel();
        await fetchTasks();
      };

      init();

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
          setShownNotifications((prev) => [
            ...prev,
            notification.request.content.data.taskId,
          ]);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
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

  const filteredTasks = tasks
    .filter((task) => shownNotifications.includes(task.id))
    .sort((a, b) => new Date(b.fechaentrega) - new Date(a.fechaentrega));

  return (
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
      <NotificationList tasksNotification={filteredTasks} />
    </View>
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
