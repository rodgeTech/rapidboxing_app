import React from 'react';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icon, Input, Button, Select} from 'react-native-ui-kitten';

const validationSchema = Yup.object().shape({
  link: Yup.string()
    .url()
    .required("Link can't be empty"),
  price: Yup.number()
    .typeError('Must be a valid number')
    .min(1, 'Price has to be greater than 0')
    .required("Price can't be blank"),
  quantity: Yup.number()
    .min(1, "Quantity can't be less than 1")
    .required("Quantity can't be empty"),
  shippingRate: Yup.string().required('You must select a shipping rate'),
});

export default (Form = ({listing, rates, createLineItem}) => (
  <Formik
    enableReinitialize
    validationSchema={validationSchema}
    initialValues={{
      details: '',
      link: listing.link,
      quantity: '1',
      price: listing.price.toString(),
      shippingRate: {
        id: listing.shippingRateId.toString(),
        text: rates.find(rate => rate.id === listing.shippingRateId).text,
      },
    }}
    onSubmit={(values, {resetForm}) => createLineItem(values, resetForm)}>
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      setFieldValue,
    }) => (
      <React.Fragment>
        <Input
          value={values.link}
          label="Link"
          labelStyle={styles.label}
          icon={() => <Icon name="link-2" fill="#C5CEE0" />}
          onChangeText={handleChange('link')}
          onBlur={handleBlur('link')}
          style={{marginBottom: 14}}
          status={touched.link && errors.link && 'danger'}
          multiline
          disabled
        />

        <Input
          value={values.details}
          label="Details"
          labelStyle={styles.label}
          icon={() => <Icon name="file-text-outline" fill="#C5CEE0" />}
          onChangeText={handleChange('details')}
          onBlur={handleBlur('details')}
          style={{marginBottom: 14}}
          status={touched.details && errors.details && 'danger'}
          multiline
        />

        <Input
          defaultValue={values.quantity}
          label="Quantity"
          labelStyle={styles.label}
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          style={{marginBottom: 14}}
          status={touched.quantity && errors.quantity && 'danger'}
          keyboardType="numbers-and-punctuation"
        />

        <Input
          value={values.price}
          label="Price"
          labelStyle={styles.label}
          icon={() => <Icon name="pricetags-outline" fill="#C5CEE0" />}
          onChangeText={handleChange('price')}
          onBlur={handleBlur('price')}
          style={{marginBottom: 14}}
          status={touched.price && errors.price && 'danger'}
          disabled
        />
        <Select
          keyExtractor="id"
          selectedOption={values.shippingRate}
          style={[styles.select]}
          data={rates}
          label="Shipping range"
          labelStyle={styles.label}
          onSelect={selectedOption =>
            setFieldValue('shippingRate', selectedOption)
          }
          controlStyle={[
            styles.controlStyle,
            touched.shippingRate && errors.shippingRate && styles.selectDanger,
          ]}
          textStyle={{fontWeight: 'normal'}}
          disabled
        />

        <Button
          size="large"
          style={{width: '100%', marginTop: 30, marginBottom: 20}}
          onPress={handleSubmit}>
          Add to cart
        </Button>
      </React.Fragment>
    )}
  </Formik>
));

const styles = StyleSheet.create({
  select: {
    width: '100%',
    shadowOffset: {height: 0, width: 0}, // IOS
  },
  controlStyle: {
    shadowOpacity: 0,
    shadowOffset: {height: 0, width: 0}, // IOS
  },
  selectDanger: {
    borderColor: '#FF3D71',
    borderWidth: 1,
  },
  label: {
    color: '#000',
    fontSize: 16,
  },
});
