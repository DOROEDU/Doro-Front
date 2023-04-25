import { View, StyleSheet, Image, Text } from "react-native";
import ButtonBig from "../ui/ButtonBig";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function FindId() {
  const navigation = useNavigation();
  function naviLogin() {
    navigation.navigate("signUp");
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={styles.text}>아직</Text>
        <Image
          style={{ width: 121, height: 26, marginTop: 89, marginLeft: 24 }}
          source={require("../../assets/doroLogoSmall.png")}
        />
        <Text style={styles.text}>가입되지 않았어요.</Text>
      </View>
      <View style={{ marginBottom: 83, marginHorizontal: 20 }}>
        <ButtonBig
          text="로그인"
          style={GlobalStyles.colors.primaryDefault}
          onPress={naviLogin}
        />
      </View>
    </View>
  );
}

export default FindId;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 28,
    marginLeft: 23,
    marginTop: 16,
  },
});
