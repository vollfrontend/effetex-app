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
  PaymentMethodsResponse,
  ShippingMethodsResponse,
  MethodOption,
  CreateOrderRequest,
  OrderProduct,
} from '@/src/api/types';

// i18n
import { useTranslation } from 'react-i18next';

// Components
import { Icon } from '@/src/components/Icon';

// Styles
import { styles } from './styles';
import { useTheme } from '@/src/hooks/useTheme';

// Utils
import { showSuccess, showError } from '@/src/utils/toast';

export const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const { t } = useTranslation();
  const inputThemeStyles = useMemo(
    () => ({
      color: theme.textPrimary,
      borderColor: theme.border,
      backgroundColor: theme.background,
    }),
    [theme],
  );

  // State
  const cart = useStore(state => state.cart);
  const user = useStore(state => state.user);
  const clearCart = useStore(state => state.clearCart);

  // Form data
  const [firstname, setFirstname] = useState(user?.firstname || '');
  const [lastname, setLastname] = useState(user?.lastname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [telephone, setTelephone] = useState(user?.telephone || '');
  const [address1, _setAddress1] = useState('');
  const [address2, _setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [novaBranchNumber, setNovaBranchNumber] = useState('');

  // Available methods
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethodsResponse | null>(null);
  const [shippingMethods, setShippingMethods] =
    useState<ShippingMethodsResponse | null>(null);

  // Selected methods
  const [selectedPayment, setSelectedPayment] = useState<MethodOption | null>(
    null,
  );
  const [selectedShipping, setSelectedShipping] = useState<MethodOption | null>(
    null,
  );

  // Loading states
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadMethods = async () => {
    setLoading(true);
    try {
      const [payments, shipping] = await Promise.all([
        getPaymentMethods(),
        getShippingMethods(),
      ]);

      // Ensure we have arrays
      // const paymentsArray = payments.payment_methods;
      // const shippingArray = shipping?.shipping_methods;

      const paymentOptions = payments?.payment_methods
        ? Object.values(payments.payment_methods)
        : [];
      const shippingOptions = shipping?.shipping_methods
        ? Object.values(shipping.shipping_methods)
        : [];

      setPaymentMethods(payments);
      setShippingMethods(shipping);

      if (paymentOptions.length > 0) {
        setSelectedPayment(paymentOptions[0]);
      }
      if (shippingOptions.length > 0) {
        setSelectedShipping(shippingOptions[0]);
      }

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
    loadMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const paymentOptions = useMemo(() => {
    return paymentMethods?.payment_methods
      ? Object.values(paymentMethods.payment_methods)
      : [];
  }, [paymentMethods]);

  const shippingOptions = useMemo(() => {
    return shippingMethods?.shipping_methods
      ? Object.values(shippingMethods.shipping_methods)
      : [];
  }, [shippingMethods]);

  // Calculate total
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const pickupLocations = useMemo(() => {
    const data = t('checkout.pickupLocations', {
      returnObjects: true,
    }) as unknown;
    return Array.isArray(data) ? (data as string[]) : [];
  }, [t]);

  const isNovaDelivery = selectedShipping?.code === 'flat';
  const isPickupDelivery = selectedShipping?.code === 'pickup';

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
    // if (!address1.trim()) {
    //   showError(t('checkout.enterAddress'));
    //   return false;
    // }
    if (!city.trim()) {
      showError(t('checkout.enterCity'));
      return false;
    }
    if (isNovaDelivery && !novaBranchNumber.trim()) {
      showError(t('checkout.enterBranchNumber'));
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
      const resolvedAddress1 = isNovaDelivery
        ? `${t('checkout.shippingFlat')} – ${t(
            'checkout.branchNumberLabel',
          )} №${novaBranchNumber}`
        : address1;

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
          address_1: resolvedAddress1,
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
          address_1: resolvedAddress1,
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

      console.log('orderData', orderData);

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
                style={[styles.input, inputThemeStyles]}
                placeholder={t('checkout.firstname')}
                placeholderTextColor={theme.textSecondary}
                value={firstname}
                onChangeText={setFirstname}
              />

              <TextInput
                style={[styles.input, inputThemeStyles]}
                placeholder={t('checkout.lastname')}
                placeholderTextColor={theme.textSecondary}
                value={lastname}
                onChangeText={setLastname}
              />

              <TextInput
                style={[styles.input, inputThemeStyles]}
                placeholder={t('checkout.telephone')}
                placeholderTextColor={theme.textSecondary}
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[styles.input, inputThemeStyles]}
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
                style={[styles.input, inputThemeStyles]}
                placeholder={t('checkout.city')}
                placeholderTextColor={theme.textSecondary}
                value={city}
                onChangeText={setCity}
              />

              <TextInput
                style={[styles.input, inputThemeStyles]}
                placeholder={t('checkout.address1')}
                placeholderTextColor={theme.textSecondary}
                value={address1}
                onChangeText={setAddress1}
              />

              <TextInput
                style={[styles.input, inputThemeStyles]}
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

              {shippingOptions.length > 0 ? (
                <View style={styles.methodsList}>
                  {shippingOptions.map(method => {
                    const isPickup = method.code === 'pickup';
                    const hint = isPickup
                      ? t('checkout.shippingPickupHint')
                      : t('checkout.shippingCarrierHint');
                    const isSelected = selectedShipping?.code === method.code;
                    return (
                      <TouchableOpacity
                        key={method.code}
                        style={[
                          styles.methodCard,
                          isSelected
                            ? styles.methodCardSelected
                            : styles.methodCardDefault,
                          {
                            backgroundColor: isSelected
                              ? theme.background
                              : theme.cardBackground,
                            borderColor: isSelected
                              ? theme.primary
                              : theme.border,
                          },
                        ]}
                        onPress={() => setSelectedShipping(method)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.methodIcon]}>
                          <Text style={styles.methodIconText}>
                            {isPickup ? (
                              <Icon
                                name="pickup"
                                size={24}
                                variant="original"
                              />
                            ) : (
                              <Icon name="flat" size={24} variant="original" />
                            )}
                          </Text>
                        </View>
                        <View style={styles.methodContent}>
                          <Text
                            style={[
                              styles.methodTitle,
                              { color: theme.textPrimary },
                            ]}
                          >
                            {method.title === 'pickup'
                              ? t('checkout.shippingPickup')
                              : method.title === 'flat'
                              ? t('checkout.shippingFlat')
                              : method.title}
                          </Text>
                          <Text
                            style={[
                              styles.methodDescription,
                              { color: theme.textSecondary },
                            ]}
                          >
                            {hint}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
              {isNovaDelivery && (
                <View
                  style={[
                    styles.shippingDetailCard,
                    {
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.shippingDetailTitle,
                      { color: theme.textPrimary },
                    ]}
                  >
                    {t('checkout.novaDeliveryDetails')}
                  </Text>
                  <Text
                    style={[
                      styles.shippingDetailLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {`${t('checkout.city')}*`}
                  </Text>
                  <TextInput
                    style={[styles.input, inputThemeStyles]}
                    placeholder={t('checkout.cityPlaceholder')}
                    placeholderTextColor={theme.textSecondary}
                    value={city}
                    onChangeText={setCity}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="addressCity"
                  />
                  <Text
                    style={[
                      styles.shippingDetailLabel,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {`${t('checkout.branchNumberLabel')}*`}
                  </Text>
                  <TextInput
                    style={[styles.input, inputThemeStyles]}
                    placeholder={t('checkout.branchNumberPlaceholder')}
                    placeholderTextColor={theme.textSecondary}
                    value={novaBranchNumber}
                    onChangeText={setNovaBranchNumber}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    keyboardType="default"
                    textContentType="none"
                  />
                </View>
              )}
              {isPickupDelivery && (
                <View
                  style={[
                    styles.shippingDetailCard,
                    {
                      backgroundColor: theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.shippingDetailTitle,
                      { color: theme.textPrimary },
                    ]}
                  >
                    {t('checkout.pickupLocationsTitle')}
                  </Text>
                  <View style={styles.pickupLocationList}>
                    {pickupLocations.map((location, index) => (
                      <Text
                        key={`${location}-${index}`}
                        style={[
                          styles.pickupLocationItem,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {location}
                      </Text>
                    ))}
                  </View>
                </View>
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

              {paymentOptions.length > 0 ? (
                <View style={styles.methodsList}>
                  {paymentOptions.map(method => {
                    const isSelected = selectedPayment?.code === method.code;
                    return (
                      <TouchableOpacity
                        key={method.code}
                        style={[
                          styles.methodCard,
                          isSelected
                            ? styles.methodCardSelected
                            : styles.methodCardDefault,
                          {
                            backgroundColor: isSelected
                              ? theme.cardBackground
                              : theme.background,
                            borderColor: isSelected
                              ? theme.primary
                              : theme.border,
                          },
                        ]}
                        onPress={() => setSelectedPayment(method)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.methodIcon]}>
                          <Icon name="cod" size={34} variant="original" />
                        </View>
                        <View style={styles.methodContent}>
                          <Text
                            style={[
                              styles.methodTitle,
                              { color: theme.textPrimary },
                            ]}
                          >
                            {method.title === 'cod'
                              ? t('checkout.paymentCod')
                              : method.title === 'free_checkout'
                              ? t('checkout.paymentFreeCheckout')
                              : method.title}
                          </Text>
                          <Text
                            style={[
                              styles.methodDescription,
                              { color: theme.textSecondary },
                            ]}
                          >
                            {t('checkout.paymentDescription')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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

              <Text
                style={[styles.paymentInfoText, { color: theme.textSecondary }]}
              >
                {t('checkout.paymentInfo')}
              </Text>
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
                style={[styles.textArea, inputThemeStyles]}
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
