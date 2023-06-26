import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
// import { format } from "date-fns";
// import ko from "date-fns/esm/locale/ko/index.js";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { GlobalStyles } from "./../constants/styles";
import ButtonBig from "../components/ui/ButtonBig";
import ButtonSmall from "../components/ui/ButtonSmall";

function UpdateLectureScreen({ route }) {
  const navigation = useNavigation();

  // console.log(route.params.data);
  const [lecturedata, setLecturedata] = useState({
    institution: "",
    city: "",
    lectureDate: {
      enrollEndDate: "2023-05-15T11:00:00.519Z",
      enrollStartDate: new Date(),
    },
    lectureContentId: null,
    lectureDates: [],
    mainTutor: "",
    mainPayment: "",
    subTutor: "",
    subPayment: "",
    staff: "",
    staffPayment: "",
    studentGrade: "",
    studentNumber: "",
    time: "",
    mainTitle: "",
    subTitle: "",
    place: "",
    status: "ALLOCATION_COMP",
  });

  const [lectureContents, setLectureContents] = useState();
  const [selectedLectureContents, setSelectedLectureContents] = useState({
    kit: "",
    detail: "",
    remark: "",
    requirement: "",
    constent: "",
  });

  const [option, setOption] = useState("create");

  // 일자 - 달력 팝업
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  // 시간 - 시간 선택 팝업
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:8080/lecture-contents", {
        headers: {
          // 헤더에 필요한 데이터를 여기에 추가
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLectureContents(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.log("에러");
        console.log(error);
      });
    if (route.params.data !== "") {
      let nonIdCheck = route.params.data.lectureDto;
      nonIdCheck["lectureContentId"] = route.params.data.lectureContentDto.id;
      setLecturedata(nonIdCheck);
      setSelectedLectureContents(route.params.data.lectureContentDto);
      setOption("update");
    } else {
      setOption("create");
    }
  }, []);

  const [inputList, setInputList] = useState([{ text: "" }]);

  const singleToDateType = () => {
    const splitedDate = lecturedata.lectureDate.enrollEndDate.split(".");
    const date = new Date(
      "20" + splitedDate[0],
      splitedDate[1] === 1 ? 12 : splitedDate[1] - 1,
      splitedDate[2]
    );

    return date;
  };

  const arrayToDateType = () => {
    const dateArray = [];
    inputList.map((item) => {
      const splitedDate = item.text.split(".");
      dateArray.push(
        new Date(
          "20" + splitedDate[0],
          splitedDate[1] === 1 ? 12 : splitedDate[1] - 1,
          splitedDate[2]
        )
      );
    });
    return dateArray;
  };

  /** 확인 버튼 누를 때 실행 */
  const updateLecture = () => {
    typeof lecturedata.lectureDate.enrollEndDate === "string"
      ? handleSingeInputChange(singleToDateType(), "enrollEndDate")
      : "";

    handleSingeInputChange(tmpDate, "lectureDates");
    handleSingeInputChange(String(mainPayment), "mainPayment");
    handleSingeInputChange(String(subPayment), "subPayment");
    handleSingeInputChange(String(staffPayment), "staffPayment");

    const times = tmpTime[0] + tmpTime[1];
    handleSingeInputChange(times, "time");

    // handleSingeInputChange(arrayToDateType(), "lectureDates");

    for (let i = 0; i < Object.keys(lecturedata).length; i++) {
      if (!lecturedata[i]) {
        Alert.alert("경고", "빈 칸이 있는지 확인 해주세요.");
      }
      break;
      // return 0;
    }

    // axios
    //   .patch(
    //     `http://10.0.2.2:8080/lectures/${route.params.data.lectureDto.id}`,
    //     lecturedata,
    //     {
    //       headers: {
    //         // 헤더에 필요한 데이터를 여기에 추가
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("강의 수정 완료");
    //   })
    //   .catch((error) => {
    //     console.log("에러");
    //     console.log(error);
    //   });
  };

  /** 확인 버튼 누를 때 실행 */
  const creatingLecture = () => {
    typeof lecturedata.lectureDate.enrollEndDate === "string"
      ? handleSingeInputChange(singleToDateType(), "enrollEndDate")
      : "";
    // 신청 마감 input을 수정 안 하면 타입이 date일 거니까...

    // handleSingeInputChange(arrayToDateType(), "lectureDates");

    handleSingeInputChange(tmpDate, "lectureDates");
    handleSingeInputChange(String(mainPayment), "mainPayment");
    handleSingeInputChange(String(subPayment), "subPayment");
    handleSingeInputChange(String(staffPayment), "staffPayment");

    const times = tmpTime[0] + "," + tmpTime[1];
    handleSingeInputChange(times, "lectureDates");

    for (let i = 0; i < Object.keys(lecturedata).length; i++) {
      if (!lecturedata[i]) {
        Alert.alert("경고", "빈 칸이 있는지 확인 해주세요.");
      }
      break;
      // return 0;
    }

    // console.log(lecturedata);

    // axios
    //   .post("http://10.0.2.2:8080/lectures/", lecturedata, {
    //     headers: {
    //       // 헤더에 필요한 데이터를 여기에 추가
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log("에러");
    //     console.log(error);
    //   });
  };

  const enrollEndDateStateChange = (text) => {
    setLecturedata((prevState) => ({
      ...prevState,
      lectureDate: { enrollEndDate: text },
    }));
    console.log(lecturedata);
  };

  const handleSingeInputChange = (text, item) => {
    setLecturedata((prevState) => ({
      ...prevState,
      [item]: text,
    }));
  };

  const savingDate = () => {};

  /** 일자 -> 2013.06.20 (화) 형식만 저장 */
  const handleDateInputChange = (text, index) => {
    const newList = [...inputList];
    newList[index].text = text;
    setInputList(newList);
  };

  /** 일자 -> date 형식 날짜 저장 */

  const handleAddInput = () => {
    const newList = [...inputList, { text: "" }];
    setInputList(newList);
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "강의 관련 정보" },
    { key: "second", title: "기본정보" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [addContentsModal, setAddContentsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [tutorModal, setTutorModal] = useState(false);

  const modalHandler = (visible) => {
    setModalVisible(visible);
  };

  const addContentsModalHandler = (visible) => {
    setAddContentsModal(visible);
    if (visible === false) {
      setModalVisible(true);
    }
  };

  const selectingLectureContents = (id) => {
    const lectureContentsData = lectureContents.filter(
      (item) => item.id === id
    );
    const writingData = lecturedata;
    writingData["lectureContentId"] = id;
    setLecturedata(writingData);
    setSelectedLectureContents(lectureContentsData[0]);
    modalHandler(false);
  };

  /** 날짜 포맷 형식 ex) "2023.06.21 (수)" */
  const dateFormat = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const month =
      date.getMonth() >= 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    const dates = date.getDate() >= 9 ? date.getDate() : "0" + date.getDate();
    const day = days[date.getDay()];
    return `${date.getFullYear()}.${month}.${dates} (${day})`;
  };

  const [inputIdx, setInputIdex] = useState();
  // 일자, 시간 중 선택
  const [mode, setMode] = useState();

  const datePickerhandler = () => {
    setDatePickerVisible(true);
  };

  /** 일자 시간 input 클릭 시 실행 함수 */
  const onPressDateInput = (idx, mode) => {
    if (mode === "date") {
      setInputIdex(idx);
    }
    setMode(mode);
    datePickerhandler();
  };

  const [tmpDate, setTmpDate] = useState([]);
  const [tmpTime, setTmpTime] = useState([]);
  const [startTime, setStartTime] = useState(true);

  /** datePicker(날짜 선택기)에서
   * 날짜 선택 후 OK 클릭시 실행 함수 */
  const onConfirm = (pickedDate) => {
    if (mode === "date") {
      handleDateInputChange(dateFormat(pickedDate), inputIdx);
      // date 타입 데이터 임시 저장
      setTmpDate((prev) => {
        let dates = [...prev];
        dates[inputIdx] = pickedDate;
        return dates;
      });
    } else if (mode === "time") {
      setTmpTime((prev) => {
        let times = [...prev];
        const hours =
          pickedDate.getHours() <= 9
            ? "0" + pickedDate.getHours()
            : String(pickedDate.getHours());
        const minute =
          pickedDate.getMinutes() <= 9
            ? "0" + pickedDate.getMinutes()
            : String(pickedDate.getMinutes());
        if (startTime) {
          times[0] = `${hours}시 ${minute}분`;
          return times;
        } else {
          times[1] = `${hours}시 ${minute}분`;
          return times;
        }
      });
    }
    setDatePickerVisible(false);
  };

  const [mainTutor, setMainTutor] = useState();
  const [subTutor, setSubTutor] = useState();
  const [staff, setStaff] = useState();

  const tutorStateHandler = (value, role) => {
    role === "main"
      ? setMainTutor(value)
      : role === "sub"
      ? setSubTutor(value)
      : setStaff(value);
  };

  const formatPeople = (input, role) => {
    let value = input.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Insert commas
    value += "명";
    tutorStateHandler(value, role);
  };

  const mainTutorHandler = (input) => {
    formatPeople(input, "main");
  };

  const subTutorHandler = (input) => {
    formatPeople(input, "sub");
  };

  const staffHandler = (input) => {
    formatPeople(input, "staff");
  };

  const [mainPayment, setMainPayment] = useState();
  const [subPayment, setSubPayment] = useState();
  const [staffPayment, setStaffPayment] = useState();

  const paymentStateHandler = (value, role) => {
    role === "main"
      ? setMainPayment(value)
      : role === "sub"
      ? setSubPayment(value)
      : setStaffPayment(value);
  };

  const mainPaymentHandler = (input) => {
    formatMoney(input, "main");
  };

  const subPaymentHandler = (input) => {
    formatMoney(input, "sub");
  };

  const staffPaymentHandler = (input) => {
    formatMoney(input, "staff");
  };

  /** 10000 => 10,000으로 바꿔줌 + 문자열X */
  const formatMoney = (input, role) => {
    let value = input.replace(/\D/g, ""); // Remove non-digits
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Insert commas
    paymentStateHandler(value, role);
  };

  // Use a custom renderScene function instead
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <View style={styles.lectureInfoListContainer}>
            <Text>강의 관련 정보</Text>
            <View style={styles.lectureInfoContainer}>
              <Text>교육 내용</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.content}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>교육 키트</Text>
              <View style={[styles.inputBox, styles.dateBox]}>
                <Text style={{ flex: 1 }}>{selectedLectureContents.kit}</Text>
                <Pressable onPress={() => modalHandler(true)}>
                  <Text style={{ marginRight: 8.03 }}>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>기본 강의 구성</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.detail}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>기타 특이 사항</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.remark}
              </Text>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>자격 요건</Text>
              <Text style={styles.inputBox}>
                {selectedLectureContents.requirement}
              </Text>
            </View>

            {/* 교육 키트 플러스(+) 버튼 누르면 나오는 하단 모달 */}
            <Modal transparent={true} visible={modalVisible}>
              <View style={styles.modalContainer}>
                <View style={styles.modalWhiteBox}>
                  <View style={styles.modalTop}>
                    <Pressable onPress={() => modalHandler(false)}>
                      <Text>X</Text>
                    </Pressable>
                    <Text>교육 목록</Text>
                    <Pressable
                      onPress={() => {
                        addContentsModalHandler(true);
                      }}
                    >
                      <Text>+</Text>
                    </Pressable>
                  </View>
                  <FlatList
                    style={styles.modalList}
                    data={lectureContents}
                    renderItem={(data) => {
                      return (
                        <Pressable
                          onPress={() => selectingLectureContents(data.item.id)}
                        >
                          <View style={styles.modalTextContainer}>
                            <Text style={styles.modalText}>
                              {data.item.kit}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    }}
                  />
                  <View style={styles.modalButtonContainer}>
                    <Pressable
                      style={styles.modalButton}
                      onPress={() => modalHandler(false)}
                    >
                      <Text>확인</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal visible={addContentsModal}>
              <Pressable onPress={() => addContentsModalHandler(false)}>
                <Text>모다아아아ㅏㅇㄹ</Text>
              </Pressable>
            </Modal>
          </View>
        );
      case "second":
        return (
          <ScrollView style={styles.lectureInfoListContainer}>
            <View style={styles.lectureInfoContainer}>
              <Text>주최 및 주관</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.institution}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "institution");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>일자</Text>
              <View>
                {inputList.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => onPressDateInput(index, "date")}
                  >
                    <View
                      style={[
                        styles.inputBox,
                        styles.dateBox,
                        index > 0 ? { marginTop: 8 } : "",
                      ]}
                    >
                      <TextInput
                        value={item.text}
                        style={{ flex: 1, color: "black" }}
                        onChangeText={(text) =>
                          handleDateInputChange(text, index)
                        }
                        editable={false}
                        // selectTextOnFocus={false}
                      />
                      {index === 0 ? (
                        <Pressable onPress={handleAddInput}>
                          <Text style={{ marginRight: 8.03, zIndex: 0 }}>
                            +
                          </Text>
                        </Pressable>
                      ) : (
                        ""
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>시간</Text>
              <View style={styles.timeContainer}>
                <Pressable
                  onPress={() => {
                    onPressDateInput(-1, "time");
                    setStartTime(true);
                  }}
                >
                  <TextInput
                    style={styles.timeInputBox}
                    // value={lecturedata.time}
                    // onChangeText={(text) => {
                    //   handleSingeInputChange(text, "time");
                    // }}
                    value={String(tmpTime[0])}
                    onChangeText={(time) => {
                      setStartTime(time);
                    }}
                    editable={false}
                  />
                </Pressable>
                <Text>~</Text>
                <Pressable
                  onPress={() => {
                    onPressDateInput(-1, "time");
                    setStartTime(false);
                  }}
                >
                  <TextInput
                    style={styles.timeInputBox}
                    // onChangeText={(text) => {
                    //   handleSingeInputChange(text, "time");
                    // }}
                    value={tmpTime[1]}
                    onChangeText={(time) => {
                      setEndTime(time);
                    }}
                    editable={false}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>지역</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.city}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "city");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>장소</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.place}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "place");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강의 대상</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentGrade}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentGrade");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>인원수</Text>
              <TextInput
                style={styles.inputBox}
                value={lecturedata.studentNumber}
                onChangeText={(text) => {
                  handleSingeInputChange(text, "studentNumber");
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>모집 인원</Text>
              <View>
                <Pressable onPress={() => setTutorModal(true)}>
                  <TextInput
                    style={styles.multiLineInputBox}
                    value={`주강사 : ${mainTutor}\n보조강사 : ${subTutor}\n스태프 : ${staff}`}
                    multiline={true}
                    editable={false}
                    // onChangeText={(text) => {
                    //   handleSingeInputChange(text, "mainTutor");
                    // }}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>신청 마감</Text>
              <TextInput
                style={styles.inputBox}
                // value={lecturedata.lectureDate.enrollEndDate}
                onChangeText={(text) => {
                  enrollEndDateStateChange(text);
                }}
              />
            </View>
            <View style={styles.lectureInfoContainer}>
              <Text>강사 급여</Text>
              <Pressable onPress={() => setPaymentModal(true)}>
                <View>
                  <TextInput
                    style={[styles.multiLineInputBox]}
                    value={`주강사 : ${mainPayment}원\n보조강사 : ${subPayment}원\n스태프 : ${staffPayment}원`}
                    multiline={true}
                    editable={false}
                    // onChangeText={(text) => {
                    //   handleSingeInputChange(text, "mainPayment");
                    // }}
                  />
                </View>
              </Pressable>
            </View>
            <ButtonBig
              text="확인"
              onPress={option === "create" ? creatingLecture : updateLecture}
            />
            {/* <Pressable
              // onPress={creatingLecture}
              onPress={option === "create" ? creatingLecture : updateLecture}
              // onPress={choiceOption}
              style={{ backgroundColor: "blue", height: 20, width: 20 }}
            /> */}

            {/* 일자, 시간 - 달력, 시간 선택 팝업 */}
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode={mode}
              onConfirm={onConfirm}
              onCancel={() => setDatePickerVisible(false)}
              date={new Date()}
            />
            {/* 모집인원 input 클릭 시 나오는 모달 */}
            <Modal transparent={true} visible={tutorModal}>
              <View style={styles.paymentModal}>
                <View style={{ backgroundColor: "white", padding: 20 }}>
                  <Text>모집대상 아니라면 칸을 비워주세요.</Text>
                  <Text>(숫자만 입력 가능)</Text>
                  <Text></Text>

                  <Text>주강사</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={mainTutorHandler}
                    value={mainTutor}
                  />
                  <Text>보조강사</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={subTutorHandler}
                    value={subTutor}
                  />
                  <Text>스태프</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={staffHandler}
                    value={staff}
                  />
                  <Text></Text>
                  <ButtonSmall
                    title="확인"
                    onPress={() => setTutorModal(false)}
                  />
                </View>
              </View>
            </Modal>
            {/* 강사 급여 input 클릭 시 나오는 모달 */}
            <Modal transparent={true} visible={paymentModal}>
              <View style={styles.paymentModal}>
                <View style={{ backgroundColor: "white", padding: 20 }}>
                  <Text>급여가 없다면 칸을 비워주세요.</Text>
                  <Text>(숫자만 입력 가능)</Text>
                  <Text></Text>

                  <Text>주강사</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={mainPaymentHandler}
                    value={mainPayment}
                  />
                  <Text>보조강사</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={subPaymentHandler}
                    value={subPayment}
                  />
                  <Text>스태프</Text>
                  <TextInput
                    style={styles.paymentInput}
                    keyboardType="number-pad"
                    onChangeText={staffPaymentHandler}
                    value={staffPayment}
                  />
                  <Text></Text>
                  <ButtonSmall
                    title="확인"
                    onPress={() => setPaymentModal(false)}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        );

      default:
        return <View />;
    }
  };
  return (
    <>
      <View style={styles.containerTop}>
        <Text>메인타이틀</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => {
            handleSingeInputChange(text, "mainTitle");
          }}
          value={lecturedata.mainTitle ? lecturedata.mainTitle : ""}
        />
        <Text>서브타이틀</Text>
        <TextInput
          style={styles.titleInput}
          onChangeText={(text) => {
            handleSingeInputChange(text, "subTitle");
          }}
          value={lecturedata.subTitle ? lecturedata.subTitle : ""}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: GlobalStyles.colors.primaryDefault,
              border: "none",
            }}
            style={{
              backgroundColor: "white",
              shadowOffset: { height: 0, width: 0 },
              shadowColor: "transparent",
            }}
            labelStyle={{
              // 폰트 컬러
              color: "black",
            }}
            pressColor={"transparent"}
          />
        )}
      />
    </>
  );
}

export default UpdateLectureScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  containerTop: {
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  titleInput: {
    height: 28,
    borderRadius: 5.41,
    backgroundColor: GlobalStyles.colors.gray07,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 78,
    backgroundColor: "white",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  lectureInfoListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  lectureInfoContainer: {
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    width: 221,
    justifyContent: "space-between",
  },
  inputBox: {
    width: 221,
    backgroundColor: GlobalStyles.colors.gray07,
    justifyContent: "center",
  },
  multiLineInputBox: {
    width: 221,
    height: 62,
    backgroundColor: GlobalStyles.colors.gray07,
    textAlignVertical: "top",
  },
  timeInputBox: {
    width: 100,
    backgroundColor: GlobalStyles.colors.gray07,
    textAlignVertical: "top",
  },
  dateBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalWhiteBox: {
    backgroundColor: "white",
    // height: 200,
  },
  modalTop: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalList: {
    marginBottom: 35,
  },
  modalTextContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.gray05,
  },
  modalText: {},
  modalButtonContainer: {
    // flex: 1,
    height: 45,
    paddingHorizontal: 20,
  },
  modalButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primaryDefault,
    borderRadius: 5.41,
  },
  paymentModal: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  paymentInput: {
    backgroundColor: GlobalStyles.colors.gray07,
    height: 40,
    width: 200,
  },
});