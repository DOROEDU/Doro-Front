import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { GlobalStyles } from "../../constants/styles";

import Xmark from "../../assets/xmark_gray.svg";

function ApplyingLectureBox({
  date,
  time,
  id,
  lectureIdHandler,
  backgroundColor,
  colors,
  subTitle,
  place,
  tutorRole,
  dateTypeValue,
  onPressX,
  onPress,
  matchingText,
}) {
  // console.log(date)
  const dateControl = (stringDate) => {
    // string에서 date 타입으로 전환하기 위해 만듬
    return new Date(stringDate);
  };

  const lectureDateControl = (dates) => {
    let result = dateControl(dates[0]).getMonth() + 1 + "월 ";
    for (let i = 0; i < dates.length; i++) {
      if (i === dates.length - 1) {
        result += dateControl(dates[i]).getDate() + "일";
      } else {
        result += dateControl(dates[i]).getDate() + "일 / ";
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

  const dateText = date
    ? date?.length > 1
      ? // 날짜가 하나 혹은 여러 개에 따라 다르게 주기
        `${lectureDateControl(date)} ${time}`
      : `${dateControl(date[0]).getMonth() + 1}월 ${dateControl(
          date[0]
        ).getDate()}일 (${days[dateControl(date[0]).getDay()]}) ${time}`
    : "";

  // console.log(date);
  return (
    <Pressable key={id} onPress={lectureIdHandler}>
      <View
        style={[
          styles.whiteBox,
          backgroundColor
            ? { backgroundColor: backgroundColor }
            : { backgroundColor: "white" },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.SubTitle}>{subTitle}</Text>

          {onPressX ? (
            <Pressable onPress={onPressX}>
              <Xmark width={20} height={20} />
            </Pressable>
          ) : (
            <Text style={{ fontSize: 10 }}>{matchingText}</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.role}>{tutorRole}</Text>
            <Text style={styles.enrollEndDate}>
              {typeof dateTypeValue === "object"
                ? `${
                    dateTypeValue?.getMonth() + 1
                  }월 ${dateTypeValue?.getDate()}일`
                : dateTypeValue}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.place}>{place}</Text>
            <Text style={styles.date}>{time}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ApplyingLectureBox;

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  whiteBox: {
    marginTop: 4,
    marginBottom: 8,
    paddingVertical: 12,
    height: 128,
    borderRadius: 5.41,
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 11,
    // backgroundColor: "white",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.3, // 그림자의 투명도
    shadowRadius: 1.5, // 그
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.gray01,
  },
  role: {
    fontSize: 12,
    color: GlobalStyles.colors.gray03,
    fontWeight: "bold",
  },
  enrollEndDate: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
  },
  place: {
    color: GlobalStyles.colors.gray03,
    fontSize: 10,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colors.primaryDefault,
  },
});
