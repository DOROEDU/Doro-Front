import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function LectureBox(props) {
  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const lectureDateControl = (date) => {
    let result = dateControl(date[0]).getMonth() + 1 + "월 ";
    for (let i = 0; i < date.length; i++) {
      if (i === date.length - 1) {
        result += dateControl(date[i]).getDate() + "일";
      } else {
        result += dateControl(date[i]).getDate() + "일 / ";
      }
    }
    return result;
  };

  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const dateText = props.date
    ? props.date?.length > 1
      ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
        `${lectureDateControl(props.date)} ${props.time}`
      : `${dateControl(props.date[0]).getMonth() + 1}월 ${dateControl(
          props.date[0]
        ).getDate()}일 (${days[dateControl(props.date[0]).getDay()]}) ${
          props.time
        }`
    : "";

  return (
    <Pressable
      style={styles.container}
      key={props.id}
      onPress={props.lectureIdHandler}
    >
      <View style={[styles.colorCover, { backgroundColor: props.colors }]}>
        <View
          style={[
            styles.whiteBox,
            {
              backgroundColor:
                props.boxColor === undefined ? "white" : props.boxColor,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.SubTitle}>{props.subTitle}</Text>
            <Text style={styles.enrollEndDate}>
              {typeof props.dateTypeValue === "object"
                ? `신청마감 ${
                    props.dateTypeValue?.getMonth() + 1
                  }월 ${props.dateTypeValue?.getDate()}일`
                : props.dateTypeValue}
            </Text>
          </View>
          <Text style={styles.tutor}>
            주강사 {props.mainTutor}
            {!props.subTutor ? "" : ", 보조강사 " + props.subTutor}
            {!props.staff ? "" : ", 스태프 " + props.staff}
          </Text>
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{props.place}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 12 }}>
              {props.tutorRole === "MAIN_TUTOR"
                ? "주강사 신청중"
                : props.tutorRole === "SUB_TUTOR"
                ? "보조강사 신청중"
                : props.tutorRole === "STAFF"
                ? "스태프 신청중"
                : props.tutorRole}
            </Text>
            <Text style={[styles.date, { color: props.colors }]}>
              {dateText}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default LectureBox;

const styles = StyleSheet.create({
  container: {
    // elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 1.5, // 그
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  lectureListContainer: {
    paddingHorizontal: 20,
  },
  colorCover: {
    marginTop: 8,
    paddingLeft: 5,
    overflow: "hidden",
    height: 120,
    borderRadius: 5.41,
    shadowColor: "Black",
    elevation: 2,
  },
  whiteBox: {
    paddingLeft: 15,
    paddingRight: 11,
    height: 120,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SubTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray01,
  },
  enrollEndDate: {
    marginTop: 10,
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  tutor: {
    fontSize: 10,
    color: GlobalStyles.colors.gray03,
  },
  placeContainer: {
    marginTop: 7.61,
    alignItems: "flex-end",
  },
  place: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  date: {
    fontSize: 12,
  },
});
