import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import InputText from "../../components/ui/InputText";
import ButtonSmall from "../../components/ui/ButtonSmall";
import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";

import { useNavigation } from "@react-navigation/native";
import { authPhoneNum, verifyauthPhoneNum } from "../../utill/auth";
import InputData from "../ui/InputData";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import Timer from "../feat/Timer";
import { SafeAreaView } from "react-native";

function AuthPhone() {
  const [phoneNum, setphoneNum] = useState("");
  const [authNum, setauthNum] = useState("");
  const [sbtnColor, setsbtnColor] = useState(GlobalStyles.colors.gray05);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [btnTitle, setBtnTitle] = useState("인증 요청");
  const { signData, setSignData } = useContext(SignContext);
  const navigation = useNavigation();

  const [count, setCount] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const handlePhoneChange = (text) => {
    setphoneNum(text);

    if (text.length === 11) {
      setsbtnColor(GlobalStyles.colors.gray01);
    } else {
      setsbtnColor(GlobalStyles.colors.gray05);
    }
  };
  const handleAuthChange = (text) => {
    setauthNum(text);
    if (text.length === 6) {
      setlbtnColor(GlobalStyles.colors.primaryAccent);
    } else {
      setlbtnColor(GlobalStyles.colors.gray05);
    }
  };

  function requestNumber() {
    if (phoneNum.length === 11) {
      authPhoneNum({ messageType: "JOIN", phone: phoneNum });
      setBtnTitle("다시 요청");
      setIsVisible(true);
      // setTimer(true);
      setCount(179);
    } else {
    }
  }
  async function verifyAuthNum() {
    if (authNum.length === 6) {
      try {
        const success = await verifyauthPhoneNum({
          authNum: authNum,
          messageType: "JOIN",
          phone: phoneNum,
        });
        if (success) {
          setSignData({ ...signData, phone: phoneNum });
          navigation.navigate("id", { h: statusBarHeight });
          setCount(0);
        } else {
          Alert.alert("인증번호 불일치");
        }
      } catch (error) {}
      // Alert.alert("ERROR", "Network Error");
    }
  }

  const { StatusBarManager } = NativeModules;
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Bar num={1} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 44 + statusBarHeight : 0
          }
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <View style={styles.textContainer}>
                <InputText text="휴대폰 번호를 알려주세요." />
              </View>
              <Text style={styles.text}>
                입력하신 번호로 인증번호가 전송됩니다.
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.input}>
                  <InputData
                    hint="휴대폰 번호"
                    onChangeText={handlePhoneChange}
                    value={phoneNum}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <ButtonSmall
                    title={btnTitle}
                    onPress={requestNumber}
                    style={sbtnColor}
                  />
                </View>
              </View>
              {isVisible && (
                <>
                  <View style={styles.lInputContainer}>
                    <InputData
                      hint="인증번호"
                      value={authNum}
                      onChangeText={handleAuthChange}
                      keyboardType="numeric"
                    />
                    <Timer count={count} setCount={setCount} />
                  </View>
                  <Text style={styles.textSend}>인증번호가 전송되었습니다</Text>
                </>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <ButtonBig
                text="다음"
                style={lbtnColor}
                onPress={verifyAuthNum}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

export default AuthPhone;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 20,
    marginTop: 35,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  lInputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
  },
  input: {
    marginRight: 7,
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
    color: GlobalStyles.colors.gray04,
    marginHorizontal: 20,
    marginTop: 3,

    lineHeight: 20,
  },
  textSend: {
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 23,
    marginTop: 3,
    marginBottom: 66,
  },
  timer: {
    color: GlobalStyles.colors.red,
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 20,
    position: "absolute",
    top: 10,
    right: 12,
  },
});
