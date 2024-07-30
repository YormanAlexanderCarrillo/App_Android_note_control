import { StyleSheet, Text, View } from "react-native";
import * as Device from "expo-device"; 
import React, { useState } from "react";
import {
  BannerAd,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";



export default function BannerSettings() {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const androidAdmobBanner = "ca-app-pub-6433913505005942/7805912482";
  return (
    <View style={{ height: isAdLoaded ? "auto" : 0 }}>
      <BannerAd
        unitId={androidAdmobBanner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => {
          console.log("Ad loaded");
          setIsAdLoaded(true);
        }}
        onAdFailedToLoad={(error) => {
          console.error("Failed to load ad:", error);
          setIsAdLoaded(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create();
