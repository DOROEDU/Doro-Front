import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import Password from "../../assets/password.svg";
import PasswordAfter from "../../assets/password_after.svg";
function PwBtn({ text, btnColor }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {btnColor === GlobalStyles.colors.primaryDefault ? (
          <PasswordAfter widht={12} height={9.4} />
        ) : (
          <Password widht={12} height={9.4} />
        )}
      </View>
      <Text style={[styles.text, { color: btnColor }]}>{text}</Text>
    </View>
  );
}

export default PwBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 17,
    marginLeft: 6,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 10,
  },
  icon: { marginTop: 7, marginBottom: 13.6, marginLeft: 7 },
});
