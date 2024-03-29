import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { KRBold, KRRegular } from "../../constants/fonts";

function TutorBox({ name, generation, school, major, lectures }) {
  // generation : 기수
  // lecture : 최근 강의
  const layout = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.name, KRBold.Title2]}>{name}</Text>
          <Text style={[styles.generation, KRRegular.Caption]}>
            DORO {generation}기
          </Text>
        </View>
        <Text
          style={[
            styles.school,
            KRRegular.Caption,
            { maxWidth: layout.width - 200 },
          ]}
        >
          {school} {major}
        </Text>
      </View>
      <Text style={[styles.new, KRRegular.Subbody]}>최근 강의</Text>
      {lectures?.map((item, i) => {
        const roles = item.tutorRole;
        const role =
          roles === "MAIN_TUTOR"
            ? "주강사"
            : roles === "SUB_TUTOR"
            ? "보조강사"
            : "스태프";
        return (
          <Text key={i} style={styles.newContent}>
            - {item.subTitle} ({role})
          </Text>
        );
      })}
      <View style={{ marginTop: 12 }}></View>
    </View>
  );
}

export default TutorBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 20,
    borderRadius: 5.41,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: GlobalStyles.colors.gray03,
    shadowOffset: { width: 0, height: 1 }, // 그림자의 오프셋
    shadowOpacity: 0.6, // 그림자의 투명도
    shadowRadius: 1, // 그
  },
  name: {
    marginTop: 14,
    marginLeft: 20,

    color: GlobalStyles.colors.gray01,
  },
  generation: {
    marginTop: 23,
    marginLeft: 4,
    color: GlobalStyles.colors.gray03,
  },
  school: {
    marginTop: 23,
    marginRight: 17,
    color: GlobalStyles.colors.gray03,
  },
  new: {
    marginTop: 14,
    marginLeft: 20,
    color: "black",
    marginBottom: 1,
  },
  newContent: {
    marginHorizontal: 20,
    fontSize: 10,
    lineHeight: 18,
    fontWeight: "400",
    letterSpacing: -0.24,
    color: GlobalStyles.colors.gray03,
  },
});
