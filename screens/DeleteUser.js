import { View, Text, StyleSheet, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";

import InputText from "../components/ui/InputText";
import InputData from "../components/ui/InputData";
import ButtonBig from "../components/ui/ButtonBig";
import { GlobalStyles } from "../constants/styles";
import { deleteUser } from "../utill/http";
import { login } from "../utill/auth";
import { AuthContext } from "../store/auth-context";

function DeleteUser({ navigation, route }) {
  const [inputPw, setInputPw] = useState("");
  const [inputRePw, setInputRePw] = useState("");
  const [isNavi, setIsNavi] = useState(false);
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const authCtx = useContext(AuthContext);
  const account = route.params.account;
  const handlePwChange = (text) => {
    setInputPw(text);
  };

  const handleRePwChange = (text) => {
    setInputRePw(text);
  };

  useEffect(() => {
    inputPw === inputRePw && inputPw !== ""
      ? setlbtnColor(GlobalStyles.colors.primaryAccent)
      : setlbtnColor(GlobalStyles.colors.gray05);
  }, [inputPw, inputRePw]);

  async function deleteUserHandler() {
    try {
      const response = await deleteUser();
      console.log(response);
      authCtx.logout();
    } catch (error) {
      console.log("유저삭제 에러" + error);
    }
  }

  async function deleteHandler() {
    if (lbtnColor === GlobalStyles.colors.primaryAccent) {
      try {
        try {
          const response = await login({ id: account, pw: inputPw });
          if (response.status === 200) {
            authCtx.authenticate(response.headers.authorization, response.data);
            Alert.alert("'DORO EDU'", "회원 탈퇴시겠습니까?", [
              {
                text: "취소",
              },
              { text: "확인", onPress: deleteUserHandler },
            ]);
          } else {
            Alert.alert("알림", "비밀번호가 틀렸습니다");
          }
        } catch (error) {
          Alert.alert("알림", "비밀번호가 틀렸습니다");
        }
      } catch (error) {
        console.log("error발생" + error);
        // console.log(error)
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <View style={styles.textContainer}>
            <InputText text="비밀번호를 입력해 주세요." />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.id}>{account}</Text>
            <Text style={styles.text}>계정의 비밀번호를 입력해주세요.</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="비밀번호를 입력해주세요"
              onChangeText={handlePwChange}
              value={inputPw}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={[styles.text, { marginLeft: 23 }]}>
              비밀번호를 한 번 더 입력해주세요
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputData
              hint="비밀번호 재입력"
              onChangeText={handleRePwChange}
              value={inputRePw}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonBig text="다음" style={lbtnColor} onPress={deleteHandler} />
        </View>
      </View>
    </View>
  );
}

export default DeleteUser;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 23,
    marginTop: 45,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 5,
  },

  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 13,
    alignItems: "center",
  },

  text: {
    fontSize: 15,
    fontWeight: 400,
    color: GlobalStyles.colors.gray01,
    marginRight: 20,
    lineHeight: 20,
  },
  id: {
    fontSize: 15,
    fontWeight: 600,
    marginLeft: 23,
    marginRight: 4,
    lineHeight: 20,
    color: GlobalStyles.colors.gray01,
  },
});
