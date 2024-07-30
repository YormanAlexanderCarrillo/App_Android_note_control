import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";
import moment from 'moment-timezone';
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationService = {
  async createChannel() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  },

  async scheduleTaskNotification(task, notificationType) {
    const notificationsEnabled = await AsyncStorage.getItem("notificationsEnabled");
    if (notificationsEnabled !== "true") {
      console.log("Notificaciones desactivadas");
      return;
    }

    const { id, title, fechaentrega } = task;
    const deliveryDate = moment(fechaentrega).tz("America/Bogota");
    const currentDate = moment().tz("America/Bogota");

    let notificationDate;
    let notificationTitle;
    let notificationBody;

    if (notificationType === "oneDay") {
      if (deliveryDate.diff(currentDate, 'hours') <= 24 && deliveryDate.diff(currentDate, 'hours') >=2) {
        notificationTitle = "Recordatorio: Tarea mañana";
        notificationBody = `La tarea ${title} debe entregarse mañana.`;
        notificationDate = currentDate.clone().add(30, "seconds").toDate(); 
      }
    } else if (notificationType === "oneWeek") {
      if (deliveryDate.diff(currentDate, 'hours') <= 168 && deliveryDate.diff(currentDate, 'hours') >= 25) {
        notificationTitle = "Recordatorio: Tarea en una semana";
        notificationBody = `La tarea ${title} debe entregarse en una semana.`;
        notificationDate = currentDate.clone().add(60, "seconds").toDate(); 
      }
    }

    if (notificationDate) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: notificationBody,
          data: { taskId: id },
        },
        trigger: notificationDate,
      });

      const notifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications')) || [];
      notifications.push({ taskId: id, type: notificationType });
      await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
    }
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem('scheduledNotifications');
  },

  async registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Fallo la obtención del token para las notificaciones");
        return;
      }
      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error("Project ID not found");
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Debe usar un dispositivo físico para las notificaciones push");
    }

    return token;
  },
};

export default NotificationService;
