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

const { width } = Dimensions.get('window');
const RIGHT_CONTENT_WIDTH = width - 115; // Total width minus left sidebar width

export default function CategoriesScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeftCat, setActiveLeftCat] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  // Combine "View All" card with current subcategories list
  const rawSubCategories = SUB_CATEGORIES_DATA[activeLeftCat] || SUB_CATEGORIES_DATA['1'];
  const gridData = [
    { id: 'view-all-card', name: 'View All', isViewAll: true },
    ...rawSubCategories
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Top Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <TextInput 
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="baby toothbrush"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.cameraIconBtn}>
            <Ionicons name="camera-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchIconButton}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Promotional Banner Info Bar */}
      <TouchableOpacity 
        style={styles.infoBar}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={styles.infoText}> Free shipping</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark" size={14} color="#16A34A" />
          <Text style={styles.infoText}> Price adjustment within 30 days</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color="#6B7280" />
      </TouchableOpacity>

      {/* Main Body Split Layout */}
      <View style={styles.bodyContainer}>
        
        {/* Left Vertical Categories Menu */}
        <View style={styles.leftContainer}>
          <FlatList
            data={LEFT_CATEGORIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = activeLeftCat === item.id;
              return (
                <TouchableOpacity 
                  style={[styles.leftItem, isSelected && styles.activeLeftItem]}
                  onPress={() => setActiveLeftCat(item.id)}
                >
                  {isSelected && <View style={styles.activeLeftIndicator} />}
                  <Text style={[styles.leftItemText, isSelected && styles.activeLeftItemText]} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Right Sub-Categories Grid (Strictly 3 Columns with safe padding) */}
        <View style={styles.rightContainer}>
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
                    <View style={styles.viewAllCircle}>
                      <Ionicons name="grid" size={22} color="#4B5563" />
                    </View>
                    <Text style={styles.subCatText} numberOfLines={1}>View All</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity 
                  style={styles.subCategoryCard}
                  onPress={() => navigation.navigate('CategoryProducts', { subCategory: item.name })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.subCatImage} />
                    {item.isHot && (
                      <View style={styles.hotBadge}>
                        <Text style={styles.hotText}>HOT</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.subCatText} numberOfLines={2}>{item.name}</Text>
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
    backgroundColor: '#FFFFFF',
  },
  searchHeader: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    paddingVertical: 0,
  },
  cameraIconBtn: {
    padding: 4,
  },
  searchIconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#000000',
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
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FEF3C7',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 11,
    color: '#166534',
    fontWeight: '600',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  leftContainer: {
    width: 115,
    backgroundColor: '#F9FAFB',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  leftItem: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    justifyContent: 'center',
    position: 'relative',
    minHeight: 50,
  },
  activeLeftItem: {
    backgroundColor: '#FFFFFF',
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
    color: '#4B5563',
    fontWeight: '500',
  },
  activeLeftItemText: {
    color: '#000000',
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  subCatImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F3F4F6',
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
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
});