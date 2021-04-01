import React from 'react';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icon, Input, Button, Text} from 'react-native-ui-kitten';

import {useConfirm} from '../../hooks/useConfirm';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  current_password: Yup.string().required('your current password is required'),
});

export default (Form = ({onUpdate, profile}) => {
  const {show, RenderConfirm} = useConfirm();

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: profile && profile.name,
        email: profile && profile.email,
        password: '',
        current_password: '',
      }}
      onSubmit={show}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
        status,
        setStatus,
        setSubmitting,
      }) => (
        <React.Fragment>
          <RenderConfirm
            callback={() => onUpdate(values, setStatus, setSubmitting)}
          />

          {status && status.error && (
            <Text
              status="danger"
              style={{marginBottom: 20, textAlign: 'center'}}>
              {status.error}
            </Text>
          )}
          <Input
            label="Name"
            labelStyle={styles.label}
            value={values.name}
            icon={() => <Icon name="person-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={{marginBottom: 10}}
            caption={errors.name && touched.name && errors.name}
            status={touched.name && errors.name && 'danger'}
          />
          <Input
            label="Email"
            labelStyle={styles.label}
            value={values.email}
            icon={() => <Icon name="email-outline" fill="#C5CEE0" />}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{marginBottom: 10}}
            caption={errors.email && touched.email && errors.email}
            status={touched.email && errors.email && 'danger'}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            disabled
          />
          <Input
            label="New Password"
            labelStyle={styles.label}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            style={{marginBottom: 10}}
            caption="Leave empty if you don't want to change"
            status={touched.password && errors.password && 'danger'}
            autoCapitalize="none"
            secureTextEntry
          />
          <Input
            label="Current Password"
            placeholder="Enter your current password"
            labelStyle={styles.label}
            value={values.current_password}
            onChangeText={handleChange('current_password')}
            onBlur={handleBlur('current_password')}
            style={{marginBottom: 10}}
            caption={
              errors.current_password &&
              touched.current_password &&
              errors.current_password
            }
            status={
              touched.current_password && errors.current_password && 'danger'
            }
            autoCapitalize="none"
            secureTextEntry
          />
          <Button
            status="success"
            size="large"
            style={{width: '100%', marginTop: 10, marginBottom: 20}}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            Update Profile
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
