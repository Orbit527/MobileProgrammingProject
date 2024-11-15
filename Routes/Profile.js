import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { firebaseAuth } from "../firebaseConfig.js";
import { styles } from "../Styles/StyleSheet.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const auth = firebaseAuth;

  const [user, setUser] = useState(null);

  // from video: https://www.youtube.com/watch?v=ONAVmsGW6-M
  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  const signOut = () => {
    firebaseAuth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <View style={styles.upperContainer}>
      <Appbar.Header elevated mode="small">
        <Appbar.Content title="Profile" titleStyle={{ fontSize: 24 }} />
      </Appbar.Header>

      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={{ marginBottom: 15 }}
            placeholder="Email"
            value={email}
            mode="outlined"
            label="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{ marginBottom: 15 }}
            placeholder="Password"
            value={password}
            mode="outlined"
            secureTextEntry={passwordHidden}
            label="Password"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setPasswordHidden(!passwordHidden)}
              />
            }
            onChangeText={(text) => setPassword(text)}
          />
          {user ? (
            <View style={{ marginVertical: 8, alignItems: "center" }}>
              <Text variant="titleMedium">You are currently logged in with:</Text>
              <Text variant="titleLarge" style={{ marginBottom: 25 }}>
                {user.email}
              </Text>

              <Button
                mode="contained"
                buttonColor="darkred"
                icon={({ size, color }) => (
                  <Icon name="logout" size={24} color="#fff" />
                )}
                style={styles.button}
                onPress={() => signOut()}
              >
                <Text variant="titleMedium" style={{ color: "white" }}>
                  Log Out
                </Text>
              </Button>
            </View>
          ) : (
            <View style={{ marginVertical: 8, alignItems: "center" }}>
              <Button
                mode="contained"
                icon={({ size, color }) => (
                  <Icon name="login" size={24} color="#fff" />
                )}
                onPress={() => signIn()}
                style={styles.button}
              >
                                <Text variant="titleMedium" style={{ color: "white" }}>
                  Login
                </Text>
              </Button>

              <Text variant="titleLarge" style={{ marginVertical: 10 }}>
                Don't have an account?
              </Text>

              <Button
                icon="account-plus-outline"
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Register
              </Button>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
