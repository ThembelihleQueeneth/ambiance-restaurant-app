import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      {/* Dim background — tap outside to cancel */}
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          {/* Stop tap-through on the card itself */}
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              {/* Icon */}
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>👋</Text>
              </View>

              <Text style={styles.title}>Log Out?</Text>
              <Text style={styles.message}>
                Are you sure you want to log out of your account?
              </Text>

              <View style={styles.buttonRow}>
                {/* Cancel */}
                <Pressable
                  style={[styles.button, styles.cancelBtn]}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>

                {/* Confirm */}
                <Pressable
                  style={[styles.button, styles.logoutBtn]}
                  onPress={onConfirm}
                >
                  <Text style={styles.logoutText}>Log Out</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    width: "82%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#F2F2F2",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  logoutBtn: {
    backgroundColor: "#FF4D4D",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
