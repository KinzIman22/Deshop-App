// src/screens/CategoryProductsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { 
  TOP_SUB_CHIPS, 
  CATEGORIES_LIST, 
  SORT_OPTIONS, 
  SIZES_LIST, 
  COLORS_LIST 
} from '../data/filterOptions';

import { CATEGORY_PRODUCTS } from '../data/productsData';

export default function CategoryProductsScreen({ route, navigation }) {
  const categoryTitle = route?.params?.subCategory || route?.params?.categoryName || 'Home & Kitchen';
  const [searchQuery, setSearchQuery] = useState(categoryTitle);
  
  const [activeSubChip, setActiveSubChip] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchSubmitBtn}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Sub-Categories */}
      <View style={styles.subChipsContainer}>
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
                <Image source={{ uri: item.image }} style={styles.subChipImage} />
                <Text style={[styles.subChipText, isSelected && styles.selectedSubText]} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter & Sort Pills Bar */}
      <View style={styles.filterBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          <TouchableOpacity 
            style={[styles.filterPill, activeModal === 'Filters' && styles.activePill]}
            onPress={() => setActiveModal('Filters')}
          >
            <Ionicons name="options-outline" size={14} color={activeModal === 'Filters' ? '#F97316' : '#374151'} style={{ marginRight: 4 }} />
            <Text style={[styles.filterPillText, activeModal === 'Filters' && styles.activePillText]}>Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeModal === 'Sort by' && styles.activePill]}
            onPress={() => setActiveModal('Sort by')}
          >
            <Text style={[styles.filterPillText, activeModal === 'Sort by' && styles.activePillText]}>Sort by</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Sort by' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeModal === 'Category' && styles.activePill]}
            onPress={() => setActiveModal('Category')}
          >
            <Text style={[styles.filterPillText, activeModal === 'Category' && styles.activePillText]}>Category</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Category' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeModal === 'Size' && styles.activePill]}
            onPress={() => setActiveModal('Size')}
          >
            <Text style={[styles.filterPillText, activeModal === 'Size' && styles.activePillText]}>Size</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Size' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeModal === 'Color' && styles.activePill]}
            onPress={() => setActiveModal('Color')}
          >
            <Text style={[styles.filterPillText, activeModal === 'Color' && styles.activePillText]}>Color</Text>
            <Ionicons name="chevron-down" size={12} color={activeModal === 'Color' ? '#F97316' : '#374151'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Products Grid */}
      <FlatList
        data={CATEGORY_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => {
              // Try standard navigation first, fallback to parent if nested inside tabs
              try {
                navigation.navigate('ItemDetail', { product: item });
              } catch (e) {
                navigation.getParent()?.navigate('ItemDetail', { product: item });
              }
            }}
          >
            <View style={styles.productImageContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
              {item.tag && (
                <View style={[styles.tagBadge, item.tag === 'SAVINGS' && { backgroundColor: '#EA580C' }]}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
            </View>

            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}> {item.rating} </Text>
              {item.sold ? <Text style={styles.soldText}>• {item.sold}</Text> : null}
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{item.price}</Text>
              <TouchableOpacity style={styles.cartBtn}>
                <Ionicons name="cart-outline" size={16} color="#FFFFFF" />
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
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{activeModal}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={22} color="#374151" />
              </TouchableOpacity>
            </View>

            {activeModal === 'Sort by' && (
              <ScrollView>
                {SORT_OPTIONS.map((sort, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedSort(sort);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, selectedSort === sort && styles.selectedModalText]}>
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
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedCategory(cat);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, selectedCategory === cat && styles.selectedModalText]}>
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
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedSize(size);
                      closeModal();
                    }}
                  >
                    <Text style={[styles.modalItemText, selectedSize === size && styles.selectedModalText]}>
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
                    style={[styles.modalItem, { flexDirection: 'row', alignItems: 'center' }]}
                    onPress={() => {
                      setSelectedColor(colorItem.name);
                      closeModal();
                    }}
                  >
                    <View style={[styles.colorCircle, { backgroundColor: colorItem.hex, borderWidth: colorItem.border ? 1 : 0, borderColor: colorItem.border || 'transparent' }]} />
                    <Text style={[styles.modalItemText, { flex: 1, marginLeft: 10 }, selectedColor === colorItem.name && styles.selectedModalText]}>
                      {colorItem.name}
                    </Text>
                    {selectedColor === colorItem.name && <Ionicons name="checkmark" size={18} color="#F97316" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {activeModal === 'Filters' && (
              <View style={{ paddingVertical: 12 }}>
                <Text style={{ color: '#6B7280', marginBottom: 16 }}>Advanced filter parameters go here.</Text>
                <TouchableOpacity style={styles.applyFilterBtn} onPress={closeModal}>
                  <Text style={styles.applyFilterText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    padding: 4,
    marginRight: 6,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  iconButton: {
    padding: 4,
  },
  searchSubmitBtn: {
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
    borderRadius: 8,
    marginLeft: 8,
  },
  subChipsContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
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
    backgroundColor: '#E5E7EB',
    marginBottom: 4,
  },
  subChipText: {
    fontSize: 11,
    color: '#4B5563',
    textAlign: 'center',
  },
  selectedSubText: {
    color: '#F97316',
    fontWeight: '600',
  },
  filterBarContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activePill: {
    backgroundColor: '#FFEDD5',
    borderColor: '#F97316',
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 12,
    color: '#374151',
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
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#E5E7EB',
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
    color: '#1F2937',
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
    color: '#4B5563',
  },
  soldText: {
    fontSize: 10,
    color: '#9CA3AF',
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
    color: '#111827',
  },
  cartBtn: {
    backgroundColor: '#F97316',
    padding: 6,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
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
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalItemText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedModalText: {
    color: '#F97316',
    fontWeight: '600',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  applyFilterBtn: {
    backgroundColor: '#F97316',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  applyFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});