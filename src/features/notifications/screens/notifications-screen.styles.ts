import { StyleSheet } from "react-native";
import { fontFamily } from "@/theme/fonts";
export const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 48, gap: 18 },
  title: { color: "white", fontFamily: fontFamily.extraBold, fontSize: 30 },
  heading: { color: "white", fontFamily: fontFamily.bold, fontSize: 16 },
  body: {
    color: "#BAC3D4",
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 21,
  },
  date: { color: "#8795AB", fontSize: 12 },
  card: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#111E33",
    borderWidth: 1,
    borderColor: "#233149",
    gap: 12,
  },
  unread: { borderColor: "#4F83E1" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  rowText: { flex: 1, gap: 4 },
  link: {
    color: "#78A5F8",
    fontFamily: fontFamily.bold,
    fontSize: 15,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#4F83E1",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  buttonText: { color: "white", fontFamily: fontFamily.bold },
  disabled: { opacity: 0.5 },
  error: { color: "#EF8E94", fontSize: 14 },
});
