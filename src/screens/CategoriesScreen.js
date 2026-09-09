import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LEFT_CATEGORIES, SUB_CATEGORIES_DATA } from '../data/categoriesData';
import AvailableOffersModal from '../components/AvailableOffersModal';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeftCat, setActiveLeftCat] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();

  // Combine "View All" card with current subcategories list
  const rawSubCategories = SUB_CATEGORIES_DATA[activeLeftCat] || SUB_CATEGORIES_DATA['1'];
  const gridData = [
    { id: 'view-all-card', name: 'View All', isViewAll: true },
    ...rawSubCategories
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: colors.background }]}>
      {/* Top Search Header */}
      <View style={[styles.searchHeader, { backgroundColor: colors.headerBg || colors.cardBg, borderBottomColor: colors.borderColor }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.borderColor }]}>
          <TextInput 
            style={[styles.searchInput, { color: colors.textPrimary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="baby toothbrush"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.cameraIconBtn}>
            <Ionicons name="camera-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.searchIconButton, { backgroundColor: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          <Ionicons name="search" size={20} color={isDarkMode ? '#000000' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner Info Bar */}
      <TouchableOpacity 
        style={[styles.infoBar, { backgroundColor: isDarkMode ? '#1E293B' : '#FFFBEB', borderBottomColor: isDarkMode ? '#334155' : '#FEF3C7' }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={[styles.infoText, { color: isDarkMode ? '#4ADE80' : '#166534' }]}> Free shipping</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={[styles.infoText, { color: isDarkMode ? '#4ADE80' : '#166534' }]}> Price adjustment within 30 days</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Main Body Split Layout */}
      <View style={styles.bodyContainer}>
        
        {/* Left Vertical Categories Menu */}
        <View style={[styles.leftContainer, { backgroundColor: colors.inputBg || '#F9FAFB', borderRightColor: colors.borderColor }]}>
          <FlatList
            data={LEFT_CATEGORIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = activeLeftCat === item.id;
              return (
                <TouchableOpacity 
                  style={[styles.leftItem, isSelected && [styles.activeLeftItem, { backgroundColor: colors.background }]]}
                  onPress={() => setActiveLeftCat(item.id)}
                >
                  {isSelected && <View style={styles.activeLeftIndicator} />}
                  <Text style={[styles.leftItemText, { color: colors.textSecondary }, isSelected && [styles.activeLeftItemText, { color: colors.textPrimary }]]} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Right Sub-Categories Grid (Strictly 3 Columns with safe padding) */}
        <View style={[styles.rightContainer, { backgroundColor: colors.background }]}>
          <FlatList
            data={gridData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 10, paddingBottom: 100 }}
            renderItem={({ item }) => {
              if (item.isViewAll) {
                return (
                  <TouchableOpacity 
                    style={styles.subCategoryCard}
                    onPress={() => navigation.navigate('CategoryProducts', { categoryId: activeLeftCat })}
                  >
                    <View style={[styles.viewAllCircle, { backgroundColor: colors.inputBg, borderColor: colors.borderColor }]}>
                      <Ionicons name="grid" size={22} color={colors.textSecondary} />
                    </View>
                    <Text style={[styles.subCatText, { color: colors.textPrimary }]} numberOfLines={1}>View All</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity 
                  style={styles.subCategoryCard}
                  onPress={() => navigation.navigate('CategoryProducts', { subCategory: item.name })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={[styles.subCatImage, { backgroundColor: colors.inputBg }]} />
                    {item.isHot && (
                      <View style={styles.hotBadge}>
                        <Text style={styles.hotText}>HOT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.subCatText, { color: colors.textPrimary }]} numberOfLines={2}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

      </View>

      {/* Available Offers Bottom Sheet Modal */}
      <AvailableOffersModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  cameraIconBtn: {
    padding: 4,
  },
  searchIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  leftContainer: {
    width: 115,
    borderRightWidth: 1,
  },
  leftItem: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    justifyContent: 'center',
    position: 'relative',
    minHeight: 50,
  },
  activeLeftItem: {
    // Background color dynamically handled inline via colors.background
  },
  activeLeftIndicator: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    backgroundColor: '#F97316',
    borderRadius: 2,
  },
  leftItemText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeLeftItemText: {
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
  },
  subCategoryCard: {
    width: '31%',
    alignItems: 'center',
    marginBottom: 18,
    marginHorizontal: '1%',
  },
  viewAllCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  subCatImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  hotBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#F97316',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  hotText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  subCatText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
});