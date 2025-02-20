import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import ProfesionalesList from "../components/ProfesionalesList/ProfesionalesList"
import type { RootStackParamList } from "../navigation/RootStack"
import { Search, ShoppingBag } from "lucide-react-native"

type ProfesionalesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Profesionales">
}

const ProfesionalesScreen: React.FC<ProfesionalesScreenProps> = ({ navigation }) => {
  const handleProfesionalPress = (id: number) => {
    navigation.navigate("ProfesionalDetail", { id })
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Profesionales</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <ShoppingBag size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner promocional */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Encuentra tu profesional</Text>
            <Text style={styles.bannerSubtitle}>Expertos calificados para tus proyectos</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: "/placeholder.svg?height=200&width=200" }} style={styles.bannerImage} />
        </View>

        {/* Lista de profesionales */}
        <View style={styles.content}>
          <ProfesionalesList onProfesionalPress={handleProfesionalPress} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  banner: {
    backgroundColor: "#0066CC",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderRadius: 12,
  },
  bannerContent: {
    flex: 1,
    paddingRight: 16,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#0066CC",
    fontWeight: "600",
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
})

export default ProfesionalesScreen

