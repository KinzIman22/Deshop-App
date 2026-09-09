import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { 
  TOP_SUB_CHIPS, 
  CATEGORIES_LIST, 
  SORT_OPTIONS, 
  SIZES_LIST, 
  COLORS_LIST 
} from '../data/filterOptions';

import { CATEGORY_PRODUCTS } from '../data/productsData';
import { useTheme } from '../context/ThemeContext';

export default function CategoryProductsScreen({ route, navigation }) {
  const categoryTitle = route?.params?.subCategory || route?.params?.categoryName || 'Home & Kitchen';
  const [searchQuery, setSearchQuery] = useState(categoryTitle);
  
  const [activeSubChip, setActiveSubChip] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const insets = useSafeAreaInsets();
  const { colors, isDarkMode } = useTheme();
  const closeModal = () => setActiveModal(null);

  const filteredProducts = CATEGORY_PRODUCTS.filter((item) => {
    const matchesSearch = searchQuery 
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const activeChipObj = TOP_SUB_CHIPS.find(chip => chip.id === activeSubChip);
    const matchesSubChip = activeChipObj 
      ? item.title.toLowerCase().includes(activeChipObj.name.toLowerCase()) || item.tag === activeChipObj.name
      : true;

    const matchesCategory = selectedCategory 
      ? item.category === selectedCategory || categoryTitle === selectedCategory
      : true;

    const matchesSize = selectedSize 
      ? item.sizes && item.sizes.includes(selectedSize)
      : true;

    const matchesColor = selectedColor 
      ? item.colors && item.colors.includes(selectedColor)
      : true;

    return matchesSearch && matchesSubChip && matchesCategory && matchesSize && matchesColor;
  }).sort((a, b) => {
    if (selectedSort === 'Price: Low to High') {
      return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
    }
    if (selectedSort === 'Price: High to Low') {
      return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
    }
    if (selectedSort === 'Rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      {/* Top Header */}
      <View style={[styles.header, { backgroundColor: colors.headerBg || colors.cardBg, borderBottomColor: colors.borderColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.borderColor }]}>
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.searchSubmitBtn, { backgroundColor: isDarkMode ? '#FFFFFF' : '#F97316' }]}>
          <Ionicons name="search" size={20} color={isDarkMode ? '#000000' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Sub-Categories */}
      <View style={[styles.subChipsContainer, { backgroundColor: colors.background, borderBottomColor: colors.borderColor }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {TOP_SUB_CHIPS.map((item) => {
            const isSelected = activeSubChip === item.id;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.subChipItem, isSelected && styles.selectedSubChip]}
                onPress={() => {
                  setActiveSubChip(item.id);
                  setSearchQuery(item.name);
                }}
              >
                <Image source={{ uri: item.image }} style={[styles.subChipImage, { backgroundColor: colors.inputBg }]} />
                <Text style={[styles.subChipText, { color: colors.textSecondary }, isSelected && styles.selectedSubText]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter & Sort Pills Bar */}
      <View style={[styles.filterBarContainer, { backgroundColor: colors.background, borderBottomColor: colors.borderColor }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          <TouchableOpacity 
            style={[
              styles.filterPill, 
              { backgroundColor: colors.inputBg, borderColor: colors.borderColor, borderWidth: 1 }, 
              activeModal === 'Filters' && [styles.activePill, { backgroundColor: isDarkMode ? '#332211' : '#FFEDD5', borderColor: '#F97316' }]
            ]}
            onPress={() => setActiveModal('Filters')}
          >
            <Ionicons name="options-outline" size={14} color={activeModal === 'Filters' ? '#F97316' : colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={[styles.filterPillText, { color: colors.textPrimary }, activeModal === 'Filters' && styles.activePillText]}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterPill, 
              { backgroundColor: colors.inputBg, borderColor: colors.borderColor, borderWidth: 1 }, 
              activeModal === 'Sort by' && [styles.activePill, { backgroundColor: isDarkMode ? '#332211' : '#FFEDD5', borderColor: '#F97316' }]
            ]}
            onPress={() => setActiveModal('Sort by')}
          >
            <Text style={[styles.filterPillText, { color: colors.textPrimary }, activeModal === 'Sort by' && styles.activePillText]}>Sort by</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Sort by' ? '#F97316' : colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterPill, 
              { backgroundColor: colors.inputBg, borderColor: colors.borderColor, borderWidth: 1 }, 
              activeModal === 'Category' && [styles.activePill, { backgroundColor: isDarkMode ? '#332211' : '#FFEDD5', borderColor: '#F97316' }]
            ]}
            onPress={() => setActiveModal('Category')}
          >
            <Text style={[styles.filterPillText, { color: colors.textPrimary }, activeModal === 'Category' && styles.activePillText]}>Category</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Category' ? '#F97316' : colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterPill, 
              { backgroundColor: colors.inputBg, borderColor: colors.borderColor, borderWidth: 1 }, 
              activeModal === 'Size' && [styles.activePill, { backgroundColor: isDarkMode ? '#332211' : '#FFEDD5', borderColor: '#F97316' }]
            ]}
            onPress={() => setActiveModal('Size')}
          >
            <Text style={[styles.filterPillText, { color: colors.textPrimary }, activeModal === 'Size' && styles.activePillText]}>Size</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Size' ? '#F97316' : colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.filterPill, 
              { backgroundColor: colors.inputBg, borderColor: colors.borderColor, borderWidth: 1 }, 
              activeModal === 'Color' && [styles.activePill, { backgroundColor: isDarkMode ? '#332211' : '#FFEDD5', borderColor: '#F97316' }]
            ]}
            onPress={() => setActiveModal('Color')}
          >
            <Text style={[styles.filterPillText, { color: colors.textPrimary }, activeModal === 'Color' && styles.activePillText]}>Color</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Color' ? '#F97316' : colors.textSecondary} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.gridContainer, { paddingBottom: insets.bottom + 20 }]}
        ListEmptyComponent={
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Ionicons name="search-outline" size={40} color={colors.textSecondary} style={{ marginBottom: 8 }} />
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>No products found matching your criteria.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.productCard, 
              { 
                backgroundColor: '#FFFFFF', // Card background forced to White
                borderColor: '#E5E7EB', 
                borderWidth: 1 
              }
            ]}
            onPress={() => {
              navigation.navigate('ItemDetail', { 
                productId: item.id, 
                product: item 
              });
            }}
          >
            <View style={[styles.productImageContainer, { backgroundColor: '#F3F4F6' }]}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
              {item.tag && (
                <View style={[styles.tagBadge, item.tag === 'SAVINGS' && { backgroundColor: '#EA580C' }]}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
            </View>

            <Text style={[styles.productTitle, { color: '#1F2937' }]} numberOfLines={2}>{item.title}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={[styles.ratingText, { color: '#6B7280' }]}> {item.rating} </Text>
              {item.sold ? <Text style={[styles.soldText, { color: '#6B7280' }]}>• {item.sold}</Text> : null}
            </View>

            <View style={styles.priceRow}>
              <Text style={[styles.priceText, { color: '#111827' }]}>{item.price}</Text>
              <TouchableOpacity style={[styles.cartBtn, { backgroundColor: '#F3F4F6' }]}>
                <Ionicons name="cart-outline" size={16} color="#F97316" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Dynamic Selection Modal */}
      <Modal
        visible={activeModal !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.cardBg || colors.background, borderColor: colors.borderColor, borderWidth: isDarkMode ? 1 : 0 }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.borderColor }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{activeModal}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {activeModal === 'Sort by' && (
              <ScrollView>
                {SORT_OPTIONS.map((sort, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.modalItem, { borderBottomColor: colors.borderColor }]}
                    onPress={() => {
                      setSelectedSort(sort);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, { color: colors.textSecondary }, selectedSort === sort && [styles.selectedModalText, { color: '#F97316' }]]}>
                      {sort}
                    </Text>
                    {selectedSort === sort && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {activeModal === 'Category' && (
              <ScrollView>
                {CATEGORIES_LIST.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.modalItem, { borderBottomColor: colors.borderColor }]}
                    onPress={() => {
                      setSelectedCategory(cat);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, { color: colors.textSecondary }, selectedCategory === cat && [styles.selectedModalText, { color: '#F97316' }]]}>
                      {cat}
                    </Text>
                    {selectedCategory === cat && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {activeModal === 'Size' && (
              <ScrollView>
                {SIZES_LIST.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.modalItem, { borderBottomColor: colors.borderColor }]}
                    onPress={() => {
                      setSelectedSize(size);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, { color: colors.textSecondary }, selectedSize === size && [styles.selectedModalText, { color: '#F97316' }]]}>
                      {size}
                    </Text>
                    {selectedSize === size && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {activeModal === 'Color' && (
              <ScrollView>
                {COLORS_LIST.map((colorItem, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.modalItem, { flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.borderColor }]}
                    onPress={() => {
                      setSelectedColor(colorItem.name);
                      closeModal();
                    }}
                  >
                    <View style={[styles.colorCircle, { backgroundColor: colorItem.hex, borderWidth: colorItem.border ? 1 : 0, borderColor: colorItem.border || 'transparent' }]} />
                    <Text style={[styles.modalItemText, { flex: 1, marginLeft: 10, color: colors.textSecondary }, selectedColor === colorItem.name && [styles.selectedModalText, { color: '#F97316' }]]}>
                      {colorItem.name}
                    </Text>
                    {selectedColor === colorItem.name && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {activeModal === 'Filters' && (
              <View style={{ paddingVertical: 12 }}>
                <Text style={{ color: colors.textSecondary, marginBottom: 16 }}>Advanced filter parameters go here.</Text>
                <TouchableOpacity style={[styles.applyFilterBtn, { backgroundColor: isDarkMode ? '#FFFFFF' : '#F97316' }]} onPress={closeModal}>
                  <Text style={[styles.applyFilterText, { color: isDarkMode ? '#000000' : '#FFFFFF' }]}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: 4,
    marginRight: 6,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  iconButton: {
    padding: 4,
  },
  searchSubmitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
    borderRadius: 8,
    marginLeft: 8,
  },
  subChipsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  subChipItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 64,
  },
  selectedSubChip: {
    opacity: 1,
  },
  subChipImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 4,
  },
  subChipText: {
    fontSize: 11,
    textAlign: 'center',
  },
  selectedSubText: {
    color: '#F97316',
    fontWeight: '600',
  },
  filterBarContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activePill: {
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 12,
  },
  activePillText: {
    color: '#F97316',
    fontWeight: '600',
  },
  gridContainer: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    borderRadius: 8,
    margin: 4,
    padding: 8,
    maxWidth: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    borderRadius: 6,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  tagBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 12,
    marginTop: 6,
    height: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 11,
  },
  soldText: {
    fontSize: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cartBtn: {
    padding: 6,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 14,
  },
  selectedModalText: {
    fontWeight: '600',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  applyFilterBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  applyFilterText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});