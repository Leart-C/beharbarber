import {
  Animated,
  Modal,
  Text,
  View,
} from "react-native";
import {
  useEffect,
  useRef,
} from "react";

import { styles } from "./success-confirmation.styles";

type SuccessConfirmationProps = {
  visible: boolean;
  title: string;
  message?: string;
  onFinished: () => void;
};

export function SuccessConfirmation({
  visible,
  title,
  message,
  onFinished,
}: SuccessConfirmationProps) {
  const overlayOpacity = useRef(
    new Animated.Value(0),
  ).current;

  const cardScale = useRef(
    new Animated.Value(0.7),
  ).current;

  const checkScale = useRef(
    new Animated.Value(0.4),
  ).current;

  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    if (!visible) {
      overlayOpacity.setValue(0);
      cardScale.setValue(0.7);
      checkScale.setValue(0.4);
      return;
    }

    const animation = Animated.sequence([
    Animated.parallel([
        Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
        }),

        Animated.spring(cardScale, {
        toValue: 1,
        damping: 11,
        stiffness: 180,
        mass: 0.7,
        useNativeDriver: true,
        }),

        Animated.sequence([
        Animated.delay(70),

        Animated.spring(checkScale, {
            toValue: 1,
            damping: 8,
            stiffness: 220,
            mass: 0.6,
            useNativeDriver: true,
        }),
        ]),
    ]),

    Animated.delay(1300),

    Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
    }),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        onFinishedRef.current();
      }
    });

    return () => {
      animation.stop();
    };
  }, [
    visible,
    overlayOpacity,
    cardScale,
    checkScale,
  ]);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={() => {}}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
      >
        <Animated.View
          accessibilityRole="alert"
          style={[
            styles.card,
            {
              transform: [
                {
                  scale: cardScale,
                },
              ],
            },
          ]}
        >
          <View style={styles.glow}>
            <Animated.View
              style={[
                styles.checkCircle,
                {
                  transform: [
                    {
                      scale: checkScale,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.check}>✓</Text>
            </Animated.View>
          </View>

          <Text style={styles.title}>{title}</Text>

          {message ? (
            <Text style={styles.message}>
              {message}
            </Text>
          ) : null}

          <Text style={styles.happyMessage}>
            Shihemi së shpejti!
          </Text>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}