import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icon, Input, Button, Text} from 'react-native-ui-kitten';

import {useConfirm} from '../../hooks/useConfirm';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  contactNumber: Yup.string().required('contact number is required'),
  name: Yup.string().required(),
  address: Yup.string().required(),
});

export default (Form = ({checkout, profile, addressLoading, address}) => {
  const {show, RenderConfirm} = useConfirm();

  return (
    <Formik
      enableReinitialize
      validationSchema={validationSchema}
      initialValues={{
        email: profile.email,
        contactNumber: '',
        name: profile.name,
        address: address,
      }}
      onSubmit={show}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <React.Fragment>
          <RenderConfirm callback={() => checkout(values)} />

          <Input
            label="Email"
            labelStyle={styles.label}
            value={values.email}
            icon={() => <Icon name="email-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{marginBottom: 16}}
            caption={errors.email && touched.email && errors.email}
            status={touched.email && errors.email && 'danger'}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
          />
          <Input
            value={values.contactNumber}
            label="Contact Number"
            labelStyle={styles.label}
            icon={() => <Icon name="phone-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('contactNumber')}
            onBlur={handleBlur('contactNumber')}
            style={{marginBottom: 16}}
            caption={
              errors.contactNumber &&
              touched.contactNumber &&
              errors.contactNumber
            }
            status={touched.contactNumber && errors.contactNumber && 'danger'}
            keyboardType="numbers-and-punctuation"
          />
          <Input
            value={values.name}
            label="Full Name"
            labelStyle={styles.label}
            icon={() => <Icon name="person-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={{marginBottom: 16}}
            caption={errors.name && touched.name && errors.name}
            status={touched.name && errors.name && 'danger'}
          />
          <Input
            value={values.address || address}
            label="Delivery Address"
            labelStyle={styles.label}
            icon={() => <Icon name="map-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            caption={errors.address && touched.address && errors.address}
            status={touched.address && errors.address && 'danger'}
            sty
          />
          {addressLoading && (
            <Text appearance="hint" style={{marginTop: 0, marginBottom: 10}}>
              Determining your address...
            </Text>
          )}
          <Button
            size="large"
            style={{width: '100%', marginTop: 20, marginBottom: 20}}
            onPress={handleSubmit}>
            Submit Order
          </Button>
        </React.Fragment>
      )}
    </Formik>
  );
});

const styles = StyleSheet.create({
  label: {
    color: '#000',
    fontSize: 16,
  },
});
