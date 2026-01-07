// src/screens/CheckoutScreen/index.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// State
import { useStore } from '@/src/state/userStore';

// API
import {
  getPaymentMethods,
  getShippingMethods,
  createOrder,
} from '@/src/api/shopApi';
import {
  PaymentMethod,
  ShippingMethod,
  CreateOrderRequest,
  OrderProduct,
} from '@/src/api/types';

// i18n
import { useTranslation } from 'react-i18next';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Utils
import { showSuccess, showError } from '@/src/utils/toast';

// Components
import { CustomPicker } from '@/src/components/CustomPicker';

export const CheckoutScreen = () => {
  console.log('🔵 CheckoutScreen: Component rendered');

  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t } = useTranslation();

  // State
  const cart = useStore(state => state.cart);
  const user = useStore(state => state.user);
  const clearCart = useStore(state => state.clearCart);

  console.log('🔵 CheckoutScreen: Cart items:', cart.length);

  // Form data
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telephone, setTelephone] = useState(user?.telephone || '');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');

  // Available methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod>();
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod>();

  // Selected methods
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null,
  );
  const [selectedShipping, setSelectedShipping] =
    useState<ShippingMethod | null>(null);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadMethods = async () => {
    console.log('🔵 CheckoutScreen: loadMethods called');
    setLoading(true);
    try {
      console.log('🔵 CheckoutScreen: Calling API methods...');
      const [payments, shipping] = await Promise.all([
        getPaymentMethods(),
        getShippingMethods(),
      ]);

      console.log('🟢 Payment methods response:', payments);
      console.log('🟢 Shipping methods response:', shipping);

      // Ensure we have arrays
      // const paymentsArray = payments.payment_methods;
      // const shippingArray = shipping?.shipping_methods;

      setPaymentMethods(payments);
      setShippingMethods(shipping);

      // Auto-select first options
      // if (paymentsArray.length > 0) {
      //   setSelectedPayment(paymentsArray[0]);
      // }
      // if (shippingArray.length > 0) {
      //   setSelectedShipping(shippingArray[0]);
      // }
    } catch (error) {
      console.error('Error loading methods:', error);
      showError(t('checkout.errorLoadingMethods'));
    } finally {
      setLoading(false);
    }
  };

  // Load payment and shipping methods
  useEffect(() => {
    console.log('🔵 CheckoutScreen: useEffect mounted, calling loadMethods');
    loadMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate total
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Validate form
  const validateForm = (): boolean => {
    if (!firstname.trim()) {
      showError(t('checkout.enterFirstname'));
      return false;
    }
    if (!lastname.trim()) {
      showError(t('checkout.enterLastname'));
      return false;
    }
    if (!email.trim()) {
      showError(t('checkout.enterEmail'));
      return false;
    }
    if (!telephone.trim()) {
      showError(t('checkout.enterTelephone'));
      return false;
    }
    if (!address1.trim()) {
      showError(t('checkout.enterAddress'));
      return false;
    }
    if (!city.trim()) {
      showError(t('checkout.enterCity'));
      return false;
    }
    if (!selectedPayment) {
      showError(t('checkout.selectPayment'));
      return false;
    }
    if (!selectedShipping) {
      showError(t('checkout.selectShipping'));
      return false;
    }
    return true;
  };

  // Submit order
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Prepare products
      const products: OrderProduct[] = cart.map(item => ({
        product_id: parseInt(item.id, 10),
        name: item.title,
        model: item.id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        option: [],
      }));

      // Prepare order data
      const orderData: CreateOrderRequest = {
        customer: {
          customer_id: user?.customer_id,
          firstname,
          lastname,
          email,
          telephone,
        },
        payment_address: {
          firstname,
          lastname,
          address_1: address1,
          address_2: address2,
          city,
          country: 'Україна',
          country_id: 220,
        },
        payment_method: {
          code: selectedPayment!.code,
          title: selectedPayment!.title,
        },
        shipping_address: {
          firstname,
          lastname,
          address_1: address1,
          address_2: address2,
          city,
          country: 'Україна',
          country_id: 220,
        },
        shipping_method: {
          code: selectedShipping!.code,
          title: selectedShipping!.title,
        },
        products,
        totals: [
          {
            code: 'sub_total',
            title: t('checkout.subtotal'),
            value: totalPrice,
            sort_order: 1,
          },
          {
            code: 'total',
            title: t('checkout.total'),
            value: totalPrice,
            sort_order: 9,
          },
        ],
        total: totalPrice,
        comment,
        currency_code: 'UAH',
        currency_id: 1,
        currency_value: 1.0,
        order_status_id: 1,
      };

      const response = await createOrder(orderData);

      if (response.success) {
        showSuccess(t('checkout.orderSuccess'));
        clearCart();
        navigation.navigate('Home');
      } else {
        showError(response.error || t('checkout.orderError'));
      }
    } catch (error) {
      console.error('Error creating order:', error);
      showError(t('checkout.orderError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textPrimary }]}>
            {t('checkout.emptyCart')}
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.goBackText, { color: theme.textPrimary }]}>
              {t('checkout.goBack')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  console.log('paymentMethods', paymentMethods);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.textPrimary }]}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {t('checkout.title')}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Customer Info Section */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                1. {t('checkout.customerInfo')}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.firstname')}
                placeholderTextColor={theme.textSecondary}
                value={firstname}
                onChangeText={setFirstname}
              />

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.lastname')}
                placeholderTextColor={theme.textSecondary}
                value={lastname}
                onChangeText={setLastname}
              />

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.telephone')}
                placeholderTextColor={theme.textSecondary}
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.email')}
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Shipping Address Section */}
            {/* <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                {t('checkout.shippingAddress')}
              </Text>

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.city')}
                placeholderTextColor={theme.textSecondary}
                value={city}
                onChangeText={setCity}
              />

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.address1')}
                placeholderTextColor={theme.textSecondary}
                value={address1}
                onChangeText={setAddress1}
              />

              <TextInput
                style={[
                  styles.input,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.address2')}
                placeholderTextColor={theme.textSecondary}
                value={address2}
                onChangeText={setAddress2}
              />
            </View> */}

            {/* Shipping Method Section */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                2. {t('checkout.shippingMethod')}
              </Text>

              {shippingMethods && shippingMethods.length > 0 ? (
                <CustomPicker
                  items={shippingMethods.map(method => ({
                    label: method.title,
                    value: method.code,
                  }))}
                  selectedValue={selectedShipping?.code || null}
                  onValueChange={value => {
                    const method = shippingMethods.find(m => m.code === value);
                    if (method) {
                      setSelectedShipping(method);
                    }
                  }}
                  placeholder={t('checkout.selectShipping')}
                  textColor={theme.textPrimary}
                  borderColor={theme.border}
                  backgroundColor={theme.cardBackground}
                />
              ) : (
                <Text
                  style={[
                    styles.methodEmptyText,
                    { color: theme.textSecondary },
                  ]}
                >
                  {t('checkout.noShippingMethods')}
                </Text>
              )}
            </View>

            {/* Payment Method Section */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                3. {t('checkout.paymentMethod')}
              </Text>

              {paymentMethods && paymentMethods.length > 0 ? (
                <CustomPicker
                  items={paymentMethods.map(method => ({
                    label: method.title,
                    value: method.code,
                  }))}
                  selectedValue={selectedPayment?.code || null}
                  onValueChange={value => {
                    const method = paymentMethods.find(m => m.code === value);
                    if (method) {
                      setSelectedPayment(method);
                    }
                  }}
                  placeholder={t('checkout.selectPayment')}
                  textColor={theme.textPrimary}
                  borderColor={theme.border}
                  backgroundColor={theme.cardBackground}
                />
              ) : (
                <Text
                  style={[
                    styles.methodEmptyText,
                    { color: theme.textSecondary },
                  ]}
                >
                  {t('checkout.noPaymentMethods')}
                </Text>
              )}
            </View>

            {/* Comment Section */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                {t('checkout.comment')}
              </Text>

              <TextInput
                style={[
                  styles.textArea,
                  { color: theme.textPrimary, borderColor: theme.border },
                ]}
                placeholder={t('checkout.commentPlaceholder')}
                placeholderTextColor={theme.textSecondary}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Order Summary */}
            <View
              style={[
                styles.section,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                {t('checkout.orderSummary')}
              </Text>

              {cart.map(item => (
                <View key={item.id} style={styles.summaryItem}>
                  <Text
                    style={[
                      styles.summaryItemName,
                      { color: theme.textPrimary },
                    ]}
                    numberOfLines={1}
                  >
                    {item.title} × {item.quantity}
                  </Text>
                  <Text
                    style={[
                      styles.summaryItemPrice,
                      { color: theme.textPrimary },
                    ]}
                  >
                    {item.price * item.quantity} ₴
                  </Text>
                </View>
              ))}

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.textPrimary }]}>
                  {t('checkout.total')}:
                </Text>
                <Text style={[styles.totalPrice, { color: theme.textPrimary }]}>
                  {totalPrice} ₴
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer with Submit Button */}
          <View
            style={[styles.footer, { backgroundColor: theme.cardBackground }]}
          >
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: theme.primary },
                submitting && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {t('checkout.placeOrder')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
