import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Share,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { PRODUCT_DETAIL_DATA } from '../data/productDetailData';
import { CartContext } from '../context/CartContext';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }) {
  const productItem = route?.params?.product || PRODUCT_DETAIL_DATA;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Cart Context
  const { addToCart } = useContext(CartContext);

  // Variant Bottom Sheet Modal States (Temu Style)
  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);

  // Review Modal States
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  
  // Base initial mock reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: '1',
      name: 'Kinzul I.',
      rating: 5,
      date: 'Aug 2026',
      comment: 'Amazing product quality, exactly as shown in pictures!',
      image: null,
    }
  ]);

  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(productItem.colors ? productItem.colors[0].id : null);
    setQuantity(1);
  }, [productItem]);

  const imagesList = productItem.images || [productItem.image];

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slide !== activeImageIndex) {
      setActiveImageIndex(slide);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${productItem.title}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const selectedColorObj = productItem.colors?.find(c => c.id === selectedColor) || productItem.colors?.[0];

  const handleAddToCart = () => {
    const colorName = selectedColorObj?.name || 'Standard';
    addToCart(productItem, colorName, quantity);
    setCartCount(prev => prev + quantity);
    setIsVariantModalVisible(false);
    Alert.alert("Success", `${quantity} item(s) added to your cart!`);
  };

  // Pick Image from Gallery for Review
  const pickReviewImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setReviewImage(result.assets[0].uri);
    }
  };

  // Submit Review Handler
  const handleDoneReview = () => {
    if (!reviewText.trim()) {
      Alert.alert("Error", "Please write something in your review.");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: 'You',
      rating: userRating,
      date: 'Just now',
      comment: reviewText,
      image: reviewImage,
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewText('');
    setReviewImage(null);
    setUserRating(5);
    setIsReviewModalVisible(false);
    Alert.alert("Thank You!", "Your review has been added successfully.");
  };

  // Dynamically compute average rating and total reviews count
  const baseTotalReviewsCount = Number(PRODUCT_DETAIL_DATA.reviewsSummary?.totalReviews || 450);
  const totalReviewsCount = baseTotalReviewsCount + reviewsList.length;

  const computedAverageRating = (() => {
    const baseRatingSum = Number(PRODUCT_DETAIL_DATA.reviewsSummary?.rating || 4.8) * baseTotalReviewsCount;
    const userReviewsSum = reviewsList.reduce((acc, rev) => acc + rev.rating, 0);
    return ((baseRatingSum + userReviewsSum) / totalReviewsCount).toFixed(1);
  })();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        
        {/* Image Carousel & Top Header Container */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {imagesList.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.carouselImage} resizeMode="cover" />
            ))}
          </ScrollView>

          {/* Top Header Icons */}
          <View style={styles.topHeaderOverlay}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleBtn}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <View style={styles.rightHeaderBtns}>
              <TouchableOpacity 
                style={[styles.circleBtn, { marginRight: 8 }]}
                onPress={() => navigation.navigate('CategoryProducts')}
              >
                <Ionicons name="search-outline" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn} onPress={handleShare}>
                <Ionicons name="share-outline" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paginationBadge}>
            <Text style={styles.paginationText}>
              {activeImageIndex + 1}/{imagesList.length}
            </Text>
          </View>
        </View>

        {/* Perks & Tags Bar */}
        <View style={styles.perksBar}>
          <View style={styles.savingsTag}>
            <Text style={styles.savingsText}>SAVINGS</Text>
          </View>
          <Text style={styles.perkItem}>✔ Free shipping</Text>
          <Text style={styles.perkItem}>✔ Rs.280 Credit for delay</Text>
        </View>

        {/* Title & Stats */}
        <View style={styles.sectionContainer}>
          <View style={styles.expressBadgeRow}>
            <View style={styles.expressBadge}>
              <Text style={styles.expressBadgeText}>2+ BUSINESS DAYS TO PK</Text>
            </View>
          </View>
          <Text style={styles.productTitle}>{productItem.title}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingNum}>{computedAverageRating}</Text>
            <Ionicons name="star" size={12} color="#F59E0B" style={{ marginLeft: 2 }} />
            <Text style={styles.soldNum}> • {productItem.sold || "1k+ sold"}</Text>
          </View>

          {/* Pricing Row */}
          <View style={styles.priceSection}>
            <Text style={styles.originalPrice}>{productItem.originalPrice || "Rs.3,500"}</Text>
            <Text style={styles.currentPrice}>{productItem.price || productItem.currentPrice || "Rs.1,999"}</Text>
            <Text style={styles.promoNote}>{productItem.promoText || "Extra 10% off"}</Text>
          </View>

          <View style={styles.discountRow}>
            <View style={styles.discountBox}>
              <Text style={styles.discountText}>{productItem.discount || "43% OFF"}</Text>
            </View>
          </View>
        </View>

        {/* Big Sale Countdown Banner */}
        <View style={styles.saleBanner}>
          <View style={styles.saleHeaderRow}>
            <Text style={styles.saleTitle}>Big sale</Text>
            <View style={styles.timerRow}>
              <Ionicons name="time-outline" size={14} color="#EA580C" />
              <Text style={styles.timerText}>Ends in {PRODUCT_DETAIL_DATA.saleEndsIn}</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.reviewsHeaderRow}
            onPress={() => setIsReviewModalVisible(true)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ratingNum}>{computedAverageRating}</Text>
              <View style={{ flexDirection: 'row', marginLeft: 6 }}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color="#F59E0B" />
                ))}
              </View>
              <Text style={styles.reviewCountText}> ({totalReviewsCount})</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#EA580C', fontWeight: 'bold', marginRight: 4 }}>Write Review</Text>
              <Ionicons name="chevron-forward" size={18} color="#EA580C" />
            </View>
          </TouchableOpacity>
          <Text style={styles.verifiedText}>All reviews are from verified purchases</Text>

          {/* Render Reviews List */}
          <View style={{ marginTop: 10 }}>
            {reviewsList.map((rev) => (
              <View key={rev.id} style={styles.userReviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{rev.name}</Text>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= rev.rating ? "star" : "star-outline"} 
                      size={12} 
                      color="#F59E0B" 
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
                {rev.image && (
                  <Image source={{ uri: rev.image }} style={styles.reviewAttachedImg} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recommended Header */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Recommended for you</Text>
        </View>

        <View style={styles.recommendedGrid}>
          {PRODUCT_DETAIL_DATA.recommendedProducts.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.recCard}
              onPress={() => {
                navigation.push('ItemDetail', { product: item });
              }}
            >
              <Image source={{ uri: item.image }} style={styles.recImg} />
              <Text style={styles.recTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.recPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Temu-Style Variant / Add to Cart Modal */}
      <Modal
        visible={isVariantModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsVariantModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.variantModalContent}>
            
            {/* Top Close Row with Product Thumbnail & Price */}
            <View style={styles.variantTopRow}>
              <Image 
                source={{ uri: selectedColorObj?.image || imagesList[0] }} 
                style={styles.variantThumbImg} 
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.variantPriceText}>{productItem.price || "Rs.575"}</Text>
                <Text style={styles.variantEstText}>Est. Rs.267 after applying promos</Text>
              </View>
              <TouchableOpacity onPress={() => setIsVariantModalVisible(false)} style={styles.closeBtnIcon}>
                <Ionicons name="close" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 350, marginTop: 10 }}>
              {/* Color Selection Header */}
              {productItem.colors && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.optionLabel}>
                    Color: <Text style={{ fontWeight: 'bold' }}>{selectedColorObj?.name || "KC Golden"}</Text>
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                    {productItem.colors.map((col) => {
                      const isSelected = selectedColor === col.id;
                      return (
                        <TouchableOpacity
                          key={col.id}
                          style={[styles.colorCardModal, isSelected && styles.selectedColorCardModal]}
                          onPress={() => setSelectedColor(col.id)}
                        >
                          <Image source={{ uri: col.image }} style={styles.colorCardImgModal} />
                          <Text style={styles.colorCardTextModal} numberOfLines={1}>{col.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* Service & Delivery Info */}
              <View style={{ marginTop: 16 }}>
                <View style={styles.serviceBoxModal}>
                  <Ionicons name="checkmark-circle" size={14} color="#166534" style={{ marginRight: 4 }} />
                  <Text style={styles.serviceTextModal}>Arrives in PK in as little as 2 business days</Text>
                </View>
                <View style={[styles.serviceBoxModal, { marginTop: 6 }]}>
                  <Ionicons name="checkmark-circle" size={14} color="#166534" style={{ marginRight: 4 }} />
                  <Text style={styles.serviceTextModal}>FREE SHIPPING</Text>
                </View>
              </View>

              {/* Quantity Counter Row */}
              <View style={styles.qtyRowModal}>
                <Text style={styles.optionLabel}>Qty</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="remove" size={16} color="#374151" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => setQuantity(quantity + 1)}
                    style={styles.counterBtn}
                  >
                    <Ionicons name="add" size={16} color="#374151" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.soldNoteModal}>Added 🔥 74K+ sold</Text>
            </ScrollView>

            {/* Bottom Action Bar inside Modal */}
            <View style={styles.modalBottomActionRow}>
              <TouchableOpacity style={styles.orangeActionBtn} onPress={handleAddToCart}>
                <View style={{ alignItems: 'center', marginHorizontal: 12 }}>
                  <Text style={styles.orangeBtnMainText}>Add {quantity} to Cart</Text>
                  <Text style={styles.orangeBtnSubText}>{selectedColorObj?.name || "KC Golden"}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* Write Review Modal */}
      <Modal
        visible={isReviewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsReviewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <TouchableOpacity onPress={() => setIsReviewModalVisible(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubLabel}>Select Rating</Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                  <Ionicons 
                    name={star <= userRating ? "star" : "star-outline"} 
                    size={30} 
                    color="#F59E0B" 
                    style={{ marginHorizontal: 4 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.modalSubLabel}>Your Review</Text>
            <TextInput
              style={styles.textInputArea}
              placeholder="What did you like or dislike?"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              value={reviewText}
              onChangeText={setReviewText}
            />

            <Text style={styles.modalSubLabel}>Add Photo (Optional)</Text>
            <TouchableOpacity style={styles.imagePickerBtn} onPress={pickReviewImage}>
              <Ionicons name="camera-outline" size={20} color="#EA580C" />
              <Text style={styles.imagePickerText}>
                {reviewImage ? "Change Image" : "Upload from Gallery"}
              </Text>
            </TouchableOpacity>

            {reviewImage && (
              <View style={styles.previewContainer}>
                <Image source={{ uri: reviewImage }} style={styles.previewImg} />
                <TouchableOpacity onPress={() => setReviewImage(null)} style={styles.removeImgBtn}>
                  <Ionicons name="close-circle" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.doneBtn} onPress={handleDoneReview}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sticky Bottom Action Bar with Cart Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.cartIconWrapper} 
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#000" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeTxt}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectOptionBtn} onPress={() => setIsVariantModalVisible(true)}>
          <Text style={styles.selectOptionBtnText}>Select Option / Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  topHeaderOverlay: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  rightHeaderBtns: {
    flexDirection: 'row',
  },
  carouselContainer: {
    width: width,
    height: 360,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: 360,
  },
  paginationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  perksBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  savingsTag: {
    backgroundColor: '#991B1B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  savingsText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  perkItem: {
    fontSize: 11,
    color: '#374151',
    marginRight: 10,
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    padding: 12,
    marginTop: 8,
  },
  expressBadgeRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  expressBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  expressBadgeText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingNum: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 13,
  },
  soldNum: {
    color: '#6B7280',
    fontSize: 12,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
    fontSize: 12,
    marginRight: 6,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA580C',
    marginRight: 6,
  },
  promoNote: {
    fontSize: 11,
    color: '#4B5563',
  },
  discountRow: {
    marginTop: 6,
  },
  discountBox: {
    backgroundColor: '#FFEDD5',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#C2410C',
    fontSize: 10,
    fontWeight: 'bold',
  },
  saleBanner: {
    backgroundColor: '#FFF7ED',
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  saleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleTitle: {
    fontWeight: 'bold',
    color: '#C2410C',
    fontSize: 14,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 12,
    color: '#C2410C',
    marginLeft: 4,
    fontWeight: '600',
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  reviewsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewCountText: {
    color: '#4B5563',
    fontSize: 13,
  },
  verifiedText: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 4,
  },
  userReviewCard: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  reviewDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  reviewComment: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
  },
  reviewAttachedImg: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginTop: 6,
  },
  recommendedHeader: {
    padding: 12,
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  recommendedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  recommendedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  recCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  recImg: {
    width: '100%',
    height: 140,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  recTitle: {
    fontSize: 12,
    color: '#1F2937',
    marginTop: 6,
    height: 32,
  },
  recPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#EA580C',
    marginTop: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cartIconWrapper: {
    position: 'relative',
    marginRight: 16,
    padding: 4,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EA580C',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeTxt: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  selectOptionBtn: {
    flex: 1,
    backgroundColor: '#EA580C',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  selectOptionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  variantModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '85%',
  },
  variantTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  variantThumbImg: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  variantPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  variantEstText: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 2,
  },
  closeBtnIcon: {
    padding: 4,
  },
  colorCardModal: {
    width: 70,
    height: 75,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
    alignItems: 'center',
    padding: 4,
  },
  selectedColorCardModal: {
    borderColor: '#EA580C',
    borderWidth: 2,
  },
  colorCardImgModal: {
    width: '100%',
    height: 48,
    borderRadius: 4,
  },
  colorCardTextModal: {
    fontSize: 10,
    color: '#374151',
    marginTop: 2,
  },
  serviceBoxModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 6,
  },
  serviceTextModal: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '500',
  },
  qtyRowModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  counterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
  },
  qtyText: {
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  soldNoteModal: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 10,
    marginBottom: 10,
  },
  modalBottomActionRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  orangeActionBtn: {
    backgroundColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 24,
  },
  orangeBtnMainText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  orangeBtnSubText: {
    color: '#FFF',
    fontSize: 10,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalSubLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  starRow: {
    flexDirection: 'row',
  },
  textInputArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    height: 100,
    fontSize: 14,
    color: '#1F2937',
  },
  imagePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EA580C',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF7ED',
  },
  imagePickerText: {
    marginLeft: 6,
    color: '#EA580C',
    fontWeight: 'bold',
    fontSize: 13,
  },
  previewContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  previewImg: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  removeImgBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  doneBtn: {
    backgroundColor: '#EA580C',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});