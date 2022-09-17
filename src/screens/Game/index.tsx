import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import logoImg from "../../assets/logo-nlw-esports.png";
import { THEME } from "../../theme";
import { Entypo } from "@expo/vector-icons";

import { GameParams } from "../../@types/navigation";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.1.4:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          horizontal
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          keyExtractor={(item) => item.id}
          data={duos}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => {}} data={item} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo ainda
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
