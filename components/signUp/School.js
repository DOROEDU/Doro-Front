import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Platform,
  NativeModules,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import InputText from "../../components/ui/InputText";

import Down from "../../assets/down.svg";
import Modalx from "../../assets/modalx.svg";
import ModalCheck from "../../assets/modalcheck.svg";

import { GlobalStyles } from "../../constants/styles";
import ButtonBig from "../../components/ui/ButtonBig";
import { useNavigation } from "@react-navigation/native";
import Bar from "../ui/Bar";
import { SignContext } from "../../store/sign-context";
import InputData from "../ui/InputData";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
function School({ navigation, route }) {
  const statusBarHeight = route.params.h;
  const [inputSchool, setInputSchool] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputStudentId, setInputStudentId] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [lbtnColor, setlbtnColor] = useState(GlobalStyles.colors.gray05);
  const [isNavi, setIsNavi] = useState(false);

  const { signData, setSignData } = useContext(SignContext);

  const [visible, setVisible] = useState(false);
  const [display1, setDispaly1] = useState("none");
  const [display2, setDispaly2] = useState("none");
  const [select, setSelect] = useState("재학유무를 선택하세요");
  const [statusStyle, setStatusStyle] = useState(styles.textModal);
  const handleSchoolChange = (text) => {
    setInputSchool(text);

    setlbtnColor(
      text !== "" &&
        inputMajor !== "" &&
        inputStudentId !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };

  const handleMajorChange = (text) => {
    setInputMajor(text);

    setlbtnColor(
      text !== "" &&
        inputSchool !== "" &&
        inputStudentId !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };
  const handleStudentIdChange = (text) => {
    setInputStudentId(text);

    setlbtnColor(
      text !== "" &&
        inputMajor !== "" &&
        inputSchool !== "" &&
        inputStatus !== ""
        ? GlobalStyles.colors.primaryDefault
        : GlobalStyles.colors.gray05
    );
  };
  // const handleStatusChange = (text) => {
  //   setInputStatus(text);
  //   setFlex1(9);
  //   setlbtnColor(
  //     text !== "" &&
  //       inputMajor !== "" &&
  //       inputStudentId !== "" &&
  //       inputSchool !== ""
  //       ? GlobalStyles.colors.primaryDefault
  //       : GlobalStyles.colors.gray05
  //   );
  // };

  function navigateId() {
    Keyboard.dismiss();
    setTimeout(() => {
      setSignData({
        ...signData,
        school: inputSchool,
        major: inputMajor,
        studentId: inputStudentId,
        studentStatus: inputStatus,
      });
      if (
        inputSchool !== "" &&
        inputMajor !== "" &&
        inputStudentId !== "" &&
        inputStatus !== ""
      ) {
        navigation.navigate("code");
      } else {
      }
    }, 50);
  }

  function statusSelect() {
    if (display1 === "none") {
      setDispaly1("flex");
      setDispaly2("none");
    } else {
      setDispaly1("none");
      setDispaly2("flex");
    }
  }

  function okayBtn() {
    if (display1 === "flex" || display2 === "flex") {
      setInputStatus(display1 === "none" ? "ABSENCE" : "ATTENDING");
      setSelect(display1 === "none" ? "휴학" : "재학");
      setStatusStyle(styles.textInputText);

      setVisible(!visible);
      setlbtnColor(
        inputMajor !== "" && inputStudentId !== "" && inputSchool !== ""
          ? GlobalStyles.colors.primaryDefault
          : GlobalStyles.colors.gray05
      );
    } else {
      setVisible(!visible);
    }
  }

  // const { StatusBarManager } = NativeModules;
  // const [statusBarHeight, setStatusBarHeight] = useState(0);
  // useEffect(() => {
  //   if (Platform.OS === "ios") {
  //     StatusBarManager.getHeight((statusBarFrameData) => {
  //       setStatusBarHeight(statusBarFrameData.height);
  //     });
  //   }
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Bar num={3} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? 44 + statusBarHeight : 0
          }
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ScrollView>
              <View style={[styles.textContainer, { marginTop: 35 }]}>
                <InputText text="학교를 입력해 주세요" />
              </View>
              {/* <Text style={styles.text}>예) 한양대학교</Text> */}
              <View style={styles.inputContainer}>
                <InputData
                  hint="예) 한양대학교"
                  onChangeText={handleSchoolChange}
                  value={inputSchool}
                />
              </View>
              <View style={styles.textContainer}>
                <InputText text="전공을 입력해 주세요" />
              </View>
              {/* <Text style={styles.text}>예) 컴퓨터학부</Text> */}
              <View style={styles.inputContainer}>
                <InputData
                  hint="예) 컴퓨터학부"
                  onChangeText={handleMajorChange}
                  value={inputMajor}
                />
              </View>
              <View style={styles.textContainer}>
                <InputText text="학번을 입력해 주세요" />
              </View>
              {/* <Text style={styles.text}>
                전체 학번을 입력해주세요. 예) 2023123456
              </Text> */}
              <View style={styles.inputContainer}>
                <InputData
                  hint="예) 2023123456"
                  onChangeText={handleStudentIdChange}
                  value={inputStudentId}
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.textContainer}>
                <InputText text="재학유무를 선택해 주세요" />
              </View>
              <Text style={styles.text}>
                재학중인 아닌 경우 모두 휴학으로 선택해 주세요.
              </Text>
              <View style={[styles.inputContainer, { marginBottom: 78 }]}>
                {/* <InputData
              hint="재학유무를 선택하세요"
              onChangeText={handleStatusChange}
              value={inputStatus}
            /> */}
                <Pressable onPress={() => setVisible(!visible)}>
                  <View style={styles.textInput}>
                    <Text style={statusStyle}>{select}</Text>
                    <View style={{ marginRight: 13 }}>
                      <Down width={24} height={24} />
                    </View>
                  </View>
                </Pressable>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <ButtonBig text="다음" style={lbtnColor} onPress={navigateId} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Modal
          animationType="none"
          transparent={true}
          visible={visible}
          statusBarTranslucent={true}
          onRequestClose={() => setVisible(!visible)}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setVisible(!visible)}
            >
              <Pressable>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 273,
                    justifyContent: "space-between",

                    borderTopEndRadius: 5.41,
                    borderTopStartRadius: 5.41,
                  }}
                >
                  <View>
                    <View style={styles.statusTitleContainer}>
                      <Pressable onPress={() => setVisible(!visible)}>
                        <View style={styles.iconContainer}>
                          <Modalx width={24} height={24} />
                        </View>
                      </Pressable>
                      <Text style={styles.statusTitle}>재학 유무</Text>
                    </View>
                    <Pressable
                      style={styles.statusTextContainer}
                      onPress={statusSelect}
                    >
                      <Text style={styles.statusText}>재학</Text>
                      <View
                        style={[styles.iconContainer2, { display: display1 }]}
                      >
                        <ModalCheck width={20} height={20} />
                      </View>
                    </Pressable>
                    <Pressable
                      style={styles.statusTextContainer}
                      onPress={statusSelect}
                    >
                      <Text style={styles.statusText}>휴학</Text>
                      <View
                        style={[styles.iconContainer2, { display: display2 }]}
                      >
                        <ModalCheck width={24} height={24} />
                      </View>
                    </Pressable>
                  </View>
                  <View style={{ marginBottom: 34, marginHorizontal: 20 }}>
                    <ButtonBig
                      text="확인"
                      style={GlobalStyles.colors.primaryDefault}
                      onPress={okayBtn}
                    />
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default School;

const styles = StyleSheet.create({
  textContainer: {
    marginHorizontal: 23,
    marginTop: 50,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 34,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 13,
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
    fontWeight: "400",
    color: GlobalStyles.colors.gray04,
    marginHorizontal: 23,
    marginTop: 3,
    lineHeight: 20,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: GlobalStyles.colors.gray05,
    borderWidth: 1,
    borderRadius: 5.41,
    paddingLeft: 20,
    lineHeight: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textModal: {
    fontSize: 15,
    fontWeight: "600",
    // lineHeight: 20,
    color: GlobalStyles.colors.gray05,
  },
  textInputText: {
    // lineHeight: 20,
    fontSize: 15,
    color: GlobalStyles.colors.gray01,
    fontWeight: "600",
  },
  textSend: {
    fontSize: 12,
    fontWeight: "400",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 66,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(84, 84, 86, 0.3)",
  },
  statusTitleContainer: {
    flexDirection: "row",
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 1,
    height: 53,
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    marginTop: 3,
    flex: 1,

    marginRight: 48,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    marginLeft: 20,
  },
  statusTextContainer: {
    borderBottomColor: GlobalStyles.colors.gray05,
    borderBottomWidth: 0.5,
    height: 42,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: 20,
    marginTop: 3,
  },
  iconContainer2: {
    marginRight: 22,
    marginTop: 2,
  },
});
